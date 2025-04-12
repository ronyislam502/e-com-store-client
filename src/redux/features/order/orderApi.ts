import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    singleOrder: builder.query({
      query: (args) => ({
        url: `/orders/${args.id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
    }),
    trendingProducts: builder.query({
      query: () => ({
        url: "/orders/trending-products",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    userOrders: builder.query({
      query: (args) => ({
        url: `/orders/${args.email}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useAllOrdersQuery,
  useAddOrderMutation,
  useSingleOrderQuery,
  useTrendingProductsQuery,
  useUserOrdersQuery,
} = orderApi;
