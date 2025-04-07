"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import ETextarea from "@/src/components/form/ETextarea";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import { TError } from "@/src/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const methods = useForm();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useAllCategoriesQuery("");

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData?.data?.map(
      (category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      })
    );
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];

    console.log("file", files);

    setImageFiles((prev) => [...prev, files]);

    if (files) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(files);
    }
  };

  const onSubmit = (data: FieldValues) => {
    const numericPrice = Number(data?.price);
    const numericQuantity = Number(data?.quantity);

    const formData = new FormData();

    const productData = {
      name: data?.name,
      description: data?.description,
      price: numericPrice,
      category: data?.category,
      brand: data?.brand,
      quantity: numericQuantity,
    };

    formData.append("data", JSON.stringify(productData));

    for (let images of imageFiles) {
      formData.append("files", images);
    }
  };

  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        Add Product
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <FormProvider {...methods}>
                <ModalHeader className="flex flex-col gap-1">
                  Add Product
                </ModalHeader>

                <EForm onSubmit={onSubmit}>
                  <ModalBody>
                    <EInput label="Name" name="name" type="text" />
                    <ETextarea
                      label="Description"
                      name="description"
                      type="text"
                    />
                    <EInput label="Price" name="price" type="number" />
                    <ESelect
                      disabled={!categorySuccess}
                      label="Category"
                      name="category"
                      options={categoryOption}
                    />
                    <EInput label="Brand" name="brand" type="text" />
                    <EInput label="Quantity" name="quantity" type="number" />
                    <div className="min-w-fit flex-1">
                      <label
                        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                        htmlFor="image"
                      >
                        Upload image
                      </label>
                      <input
                        multiple
                        className="hidden"
                        id="images"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map((imageDataUrl) => (
                          <div
                            key={imageDataUrl}
                            className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                          >
                            <Image
                              alt="item"
                              className="h-full w-full object-cover object-center rounded-md"
                              height={200}
                              src={imageDataUrl}
                              width={200}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Submit
                    </Button>
                  </ModalFooter>
                </EForm>
              </FormProvider>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddProduct;
