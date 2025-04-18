"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TProduct } from "@/src/types/product";
import { useUpdateProductMutation } from "@/src/redux/features/product/productApi";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ETextarea from "@/src/components/form/ETextarea";
import ESelect from "@/src/components/form/ESelect";
import { TError } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductValidationSchema } from "@/src/schemas/productValidationSchema";
import { EditIcon } from "@/src/components/icons";

type TProps = {
  product: TProduct;
};

const EditProduct = ({ product }: TProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.images || []
  );

  const [updateProduct] = useUpdateProductMutation();

  const methods = useForm();

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
    const files = e.target.files;

    if (files && files[0]) {
      const fileArray = Array.from(files);

      setImageFiles((prev) => [...prev, ...fileArray]);

      fileArray.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("update product....", { duration: 2000 });
    const numericPrice = Number(data?.price);
    const numericQuantity = Number(data?.quantity);
    const formData = new FormData();

    try {
      const updatedData = {
        name: data?.name,
        description: data?.description,
        brand: data?.brand,
        category: data?.category,
        price: numericPrice,
        quantity: numericQuantity,
      };

      formData.append("data", JSON.stringify(updatedData));

      for (let images of imageFiles) {
        formData.append("files", images);
      }

      const res = await updateProduct({
        id: product._id,
        data: formData,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, { duration: 2000 });
    }
  };

  return (
    <div>
      <Button color="warning" size="sm" onPress={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                Update Product
              </ModalHeader>
              <EForm
                defaultValues={{
                  name: product?.name,
                  description: product?.description,
                  price: product?.price,
                  brand: product?.brand,
                  quantity: product?.quantity,
                  category: product?.category?._id,
                }}
                resolver={zodResolver(updateProductValidationSchema)}
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
                      Upload Image
                    </label>
                    <input
                      multiple
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="flex gap-2 px-10 py-2 flex-wrap">
                      {imagePreviews.map((img, idx) => (
                        <Image
                          key={idx}
                          alt="preview"
                          className="rounded-md"
                          height={50}
                          src={img}
                          width={100}
                        />
                      ))}
                    </div>
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="success" type="submit" onPress={onClose}>
                    Update
                  </Button>
                </ModalFooter>
              </EForm>
            </FormProvider>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProduct;
