import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTwoReviews: builder.query({
      query: () => ({
        url: `/reviews?number=2`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
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
    getSingleProductReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
  }),
});

export const {
  useGetLatestTwoReviewsQuery,
  useGetSingleProductReviewQuery,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} = reviewApi;
