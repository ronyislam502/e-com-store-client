"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import productValidationSchema from "@/src/schemas/productValidationSchema";
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
import React from "react";
import { FieldValues } from "react-hook-form";

const AddProduct = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (data: FieldValues) => {
    console.log("product-add", typeof data.price);
  };

  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <EForm
                resolver={zodResolver(productValidationSchema)}
                onSubmit={onSubmit}
              >
                <ModalBody>
                  <EInput label="Name" name="name" type="text" />
                  <EInput label="Price" name="price" type="number" />
                  <EInput label="Quantity" name="quantity" type="number" />
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

export default AddProduct;
