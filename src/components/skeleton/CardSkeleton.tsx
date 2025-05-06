import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const CardSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {" "}
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className="shadow-2xl animate-pulse">
          <CardBody className="overflow-visible bg-white flex justify-center">
            <Skeleton className="rounded-lg">
              <div className="h-[296px] w-[350px] bg-gray-300 rounded-lg" />
            </Skeleton>
          </CardBody>
          <CardFooter className="flex flex-col items-center bg-white p-4">
            <Skeleton>
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
            </Skeleton>
            <Skeleton>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-4" />
            </Skeleton>
            <Skeleton>
              <div className="h-10 w-32 bg-gray-300 rounded-lg" />
            </Skeleton>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default CardSkeleton;
