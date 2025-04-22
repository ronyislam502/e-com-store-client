"use client";

import { useGetAllReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { formatDate } from "@/src/utils/Date";
import Link from "next/link";
import CountUp from "react-countup";

const Reviews = () => {
  const { data: reviews } = useGetAllReviewsQuery("");

  return (
    <div className="mt-10">
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
              end={reviews?.data?.reviews.length}
              start={0}
            />
            <Link
              className="text-xl font-semibold bg-primary text-white py-2 px-6 rounded-md mt-5"
              href={"/reviews"}
            >
              See All Reviews
            </Link>
          </div>
        </div>
        <div className="lg:w-[50%] mt-4">
          <div className="">
            {reviews?.data?.reviews?.slice(0, 2).map((review: any) => {
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
        </div>
      </div>
    </div>
  );
};

export default Reviews;
