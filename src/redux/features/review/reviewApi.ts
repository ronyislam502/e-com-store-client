import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/reviews",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "reviews/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewApi;
