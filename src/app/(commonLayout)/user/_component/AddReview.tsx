"use client";

import EForm from "@/src/components/form/EForm";
import ETextarea from "@/src/components/form/ETextarea";
import { StarIcon } from "@/src/components/icons";
import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useCreateReviewMutation } from "@/src/redux/features/review/reviewApi";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TError } from "@/src/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddReview = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState<number>(0);
  const loggedUser = useAppSelector(selectCurrentUser) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];

  const [addReview] = useCreateReviewMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const reviewData = {
        user: user?._id,
        feedback: data?.feedback,
        rating,
      };
      const res = await addReview(reviewData);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, { duration: 2000 });
    }
  };

  return (
    <div>
      <Button className="mt-2" color="success" onPress={onOpen}>
        review
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                review
              </ModalHeader>
              <EForm onSubmit={onSubmit}>
                <ModalBody>
                  <ETextarea label="Feedback" name="feedback" type="text" />
                  <div>
                    <h3>Rating</h3>
                    <div className="flex space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`cursor-pointer w-6 h-6 ${
                            rating >= star ? "text-yellow-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="text-center">
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" type="submit" onPress={onClose}>
                    Add
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

export default AddReview;
