"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import loginValidationSchema from "@/src/schemas/loginValidationSchema";
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
import { FieldValues } from "react-hook-form";

const EditProduct = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <Button color="primary" size="sm" onPress={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <EForm
                resolver={zodResolver(loginValidationSchema)}
                onSubmit={onSubmit}
              >
                <ModalBody>
                  <EInput label="Email" name="email" variant="bordered" />
                  <EInput label="Password" name="password" type="text" />
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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProduct;
