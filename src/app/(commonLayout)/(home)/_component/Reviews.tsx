"use client";

import { useGetAllReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { formatDate } from "@/src/utils/Date";
import { Pagination } from "@heroui/pagination";
import { useState } from "react";
import CountUp from "react-countup";

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: reviews } = useGetAllReviewsQuery({ page, limit });

  return (
    <div className="my-10">
      <div className="flex lg:flex-row flex-col justify-between gap-y-5 gap-x-[70px]">
        <div className="lg:w-[50%] bg-green-500 p-5 rounded-md text-white">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Our Customers Love Us
          </h3>
          <h4 className="text-xl font font-medium text-center">
            See the average rating based on customer feedback and reviews.
          </h4>
          <div className="flex flex-col items-center mt-4">
            <div>
              <p className="text-xl font-medium">
                Average rating:{" "}
                <span className="text-3xl font-bold">
                  {reviews?.data?.averageRating}
                </span>
              </p>
            </div>
            <p className="text-xl font-medium mt-4">Total ratings:</p>
            <CountUp
              className="text-5xl font-bold "
              delay={1}
              duration={5}
              end={reviews?.data?.data?.length}
              start={0}
            />
          </div>
        </div>
        <div className="lg:w-[50%] mt-4">
          <div className="">
            {reviews?.data?.data?.slice(0, 2).map((review: any) => {
              return (
                <div
                  key={review?._id}
                  className="mt-4 bg-blue-100 p-5 rounded-md"
                >
                  <p className="font-medium text-lg">{review?.user?.name}</p>
                  <p>{review?.feedback}</p>
                  <p>
                    {...Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                    ))}
                  </p>
                  <p className="flex items-center gap-x-1 font-medium ">
                    Date: {formatDate(review?.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-6 text-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={reviews?.meta?.totalPage}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
