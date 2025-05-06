/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ETextarea from "@/src/components/form/ETextarea";
import { contactValidationSchema } from "@/src/schemas/loginValidationSchema";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const Contact = () => {
  const methods = useForm();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Process....", { duration: 2000 });

    try {
      //   const userData = {
      //     name: data?.name,
      //     email: data?.email,
      //     phone: data?.phone,
      //     message: data?.message,
      //   };

      //   console.log(userData);

      toast.success("Submit successfully", { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="flex  w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Contact Us</h3>
        <p className="px-6 text-center">
          We&apos;d love to hear from you! Please reach out with any questions
          or feedback.
        </p>
        <FormProvider {...methods}>
          <div className="lg:w-[35%]">
            <EForm
              resolver={zodResolver(contactValidationSchema)}
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
                <ETextarea label="Message" name="message" type="text" />
              </div>
              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
              >
                Send Message
              </Button>
            </EForm>
          </div>
        </FormProvider>
      </div>

      {/* Support Highlight Section */}
      <div className="bg-secondary-700 dark:bg-dark-100 py-10 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-emerald-400 mb-4">
            Why Our Support is the Best
          </h2>
          <p className="text-lg text-white mb-8">
            We pride ourselves on providing unparalleled support to our
            customers. Our dedicated team is always ready to assist you with any
            inquiries, ensuring your experience is seamless and satisfying.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-10 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-primary">
                24/7 Availability
              </h3>
              <p className="text-gray-600">
                Reach us anytime, day or night, for immediate assistance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-primary">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Our knowledgeable staff is trained to provide the best
                solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-primary">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600">
                Your happiness is our priority; we go the extra mile to ensure
                it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
