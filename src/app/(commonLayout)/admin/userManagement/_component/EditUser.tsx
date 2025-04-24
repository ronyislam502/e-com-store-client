"use client";

import EForm from "@/src/components/form/EForm";
import ESelect from "@/src/components/form/ESelect";
import { EditIcon } from "@/src/components/icons";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import { updateUserValidationSchema } from "@/src/schemas/UserValidationSchema";

import { TError } from "@/src/types";
import { TUser } from "@/src/types/user";
import { Avatar } from "@heroui/avatar";
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
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  user: TUser;
  disabled: boolean;
};

const userRoleOption = [
  { key: "user", label: "user" },
  { key: "admin", label: "admin" },
];

const EditUser = ({ user, disabled }: TProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    try {
      const userInfo = {
        role: data?.role,
      };
      // console.log("user-data", userInfo);

      formData.append("data", JSON.stringify(userInfo));

      await updateUser({
        id: user._id,
        data: formData,
      }).unwrap();

      // console.log("view-res", res);

      toast.success("update user role", { duration: 2000 });
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, { duration: 2000 });
    }
  };

  return (
    <div>
      <Button
        className={disabled ? "cursor-not-allowed opacity-50" : ""}
        color="warning"
        isDisabled={disabled}
        size="sm"
        onPress={onOpen}
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                Update User Role
              </ModalHeader>
              <EForm
                defaultValues={{
                  role: user?.role,
                }}
                resolver={zodResolver(updateUserValidationSchema)}
                onSubmit={onSubmit}
              >
                <ModalBody>
                  <div className="flex text-center gap-6 px-8">
                    <Avatar
                      className="cursor-pointer"
                      name="images"
                      src={user?.profileImg || ""}
                    />
                    <div>
                      <h2>
                        Name: <span className="font-bold">{user?.name}</span>
                      </h2>
                      <h2>
                        Email: <span className="font-bold">{user?.email}</span>
                      </h2>
                    </div>
                  </div>
                  <ESelect label="Role" name="role" options={userRoleOption} />
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

export default EditUser;
