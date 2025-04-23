"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@heroui/input";
import { IInput } from "@/src/types";

interface IProps extends IInput {}

const EInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name);

  return (
    <Input
      {...register(name)}
      color="success"
      defaultValue={value}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
};

export default EInput;
