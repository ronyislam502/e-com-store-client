import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";
import { Select, SelectItem } from "@heroui/select";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const ESelect = ({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      isDisabled={disabled}
      label={label}
      value={currentValue || ""}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default ESelect;
