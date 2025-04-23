"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useSignupMutation } from "@/src/redux/features/auth/authApi";
import { registerUserValidationSchema } from "@/src/schemas/UserValidationSchema";
import { TError } from "@/src/types";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const methods = useForm();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [signup] = useSignupMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      //   console.log("img", imageUrl);

      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    try {
      const authInfo = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        password: data.password,
      };

      formData.append("data", JSON.stringify(authInfo));

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await signup(formData).unwrap();

      toast.success("user register successfully", { duration: 2000 });
      methods.reset();
      router.push("/login");
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, { duration: 2000 });
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center mt-10">
      <h3 className="my-2 text-2xl font-bold">Register with E-com</h3>
      <p className="mb-4">Let&apos;s Started</p>
      <FormProvider {...methods}>
        <div className="w-[35%]">
          <EForm
            resolver={zodResolver(registerUserValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <EInput label="Name" name="name" type="text" />
            </div>
            <div className="py-3">
              <EInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <EInput label="Phone" name="phone" type="text" />
            </div>
            <div className="py-3">
              <EInput label="Address" name="address" type="text" />
            </div>
            <div className="py-3">
              <EInput label="Password" name="password" type="text" />
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
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </EForm>
          <div className="text-center">
            already have an account ? <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
