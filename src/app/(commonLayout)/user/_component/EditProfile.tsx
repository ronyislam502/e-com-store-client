"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { EditIcon } from "@/src/components/icons";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import { updateUserValidationSchema } from "@/src/schemas/UserValidationSchema";
import { TError } from "@/src/types";
import { TUser } from "@/src/types/user";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  user: TUser;
};

const EditProfile = ({ user }: TProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(user?.profileImg || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const methods = useForm();

  const [updateUser] = useUpdateUserMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);

      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    try {
      const userInfo = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
      };

      //   console.log("user-data", userInfo);

      formData.append("data", JSON.stringify(userInfo));

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateUser({
        id: user._id,
        data: formData,
      }).unwrap();

      //   console.log("view-res", res);

      toast.success("User Info update", { duration: 2000 });
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
                  name: user?.name,
                  email: user?.email,
                  phone: user?.phone,
                  address: user?.address,
                }}
                resolver={zodResolver(updateUserValidationSchema)}
                onSubmit={onSubmit}
              >
                <ModalBody>
                  <EInput label="Name" name="name" type="text" />
                  <EInput label="Email" name="email" type="email" />
                  <div className="flex gap-2">
                    <EInput label="Phone" name="phone" type="text" />
                    <EInput label="Address" name="address" type="text" />
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
                    {previewImage && (
                      <div className="mt-4 flex justify-center">
                        <Image
                          alt="Preview"
                          className="rounded-full object-cover border"
                          height={80}
                          src={previewImage}
                          width={80}
                        />
                      </div>
                    )}
                  </div>
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

export default EditProfile;
