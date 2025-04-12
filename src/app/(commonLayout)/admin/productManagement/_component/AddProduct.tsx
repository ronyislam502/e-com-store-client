"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import ETextarea from "@/src/components/form/ETextarea";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import { useAddProductMutation } from "@/src/redux/features/product/productApi";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductValidationSchema } from "@/src/schemas/productValidationSchema";

const AddProduct = () => {
  const methods = useForm();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [createProduct] = useAddProductMutation();

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

    setImageFiles((prev) => [...prev, files]);

    if (files) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(files);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Add product....");

    const numericPrice = Number(data?.price);
    const numericQuantity = Number(data?.quantity);
    const formData = new FormData();

    try {
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
      const res = await createProduct(formData).unwrap();

      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        methods.reset();
        setImageFiles([]);
        setImagePreviews([]);
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <Button className="mt-2" color="success" onPress={onOpen}>
        Add Product
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <FormProvider {...methods}>
                <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                  Add Product
                </ModalHeader>
                <EForm
                  resolver={zodResolver(createProductValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <ModalBody>
                    <EInput label="Name" name="name" type="text" />
                    <ETextarea
                      label="Description"
                      name="description"
                      type="text"
                    />
                    <div className="flex gap-2">
                      <ESelect
                        disabled={!categorySuccess}
                        label="Category"
                        name="category"
                        options={categoryOption}
                      />
                      <EInput label="Brand" name="brand" type="text" />
                    </div>
                    <div className="flex gap-2">
                      <EInput label="Price" name="price" type="number" />
                      <EInput label="Quantity" name="quantity" type="number" />
                    </div>
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
                        id="image"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-2 px-10 py-2 flex-wrap">
                        {imagePreviews.map((imageDataUrl) => (
                          <div key={imageDataUrl} className="rounded-xl">
                            <Image
                              alt="product"
                              className="rounded-md"
                              height={50}
                              src={imageDataUrl}
                              width={100}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter className="text-center">
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="success" type="submit" onPress={onClose}>
                      Add
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
