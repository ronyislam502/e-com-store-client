"use client";

import { DeleteIcon } from "@/src/components/icons";
import { useDeleteProductMutation } from "@/src/redux/features/product/productApi";
import { TError } from "@/src/types";
import { TProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import Image from "next/image";
import { toast } from "sonner";

type TProps = {
  product: TProduct;
};

const DeleteProduct = ({ product }: TProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("please wait...");

    try {
      const res = await deleteProduct(id);

      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      const err = error as TError;

      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <Button color="danger" size="sm" onPress={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                Delete product
              </ModalHeader>
              <ModalBody>
                <h2 className="font-bold">{product?.name}</h2>
                <div className="flex gap-4">
                  {product?.images?.map((image: string) => (
                    <Image
                      key={image}
                      alt={""}
                      className="cursor-pointer border-spacing-2"
                      height={150}
                      src={image}
                      width={170}
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
