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
      label={label}
      minRows={6}
      value={currentValue || ""}
      variant={variant}
    />
  );
};

export default ETextarea;
