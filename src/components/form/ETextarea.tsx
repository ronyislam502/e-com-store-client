/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";
import { Textarea } from "@heroui/input";

interface IProps extends IInput {
  type?: string;
}

const ETextarea = ({ name, label, variant = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      color="success"
      label={label}
      minRows={4}
      value={currentValue || ""}
      variant={variant}
    />
  );
};

export default ETextarea;
