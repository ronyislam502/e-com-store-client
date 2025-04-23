import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
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
      query: ({ loggedUser, page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/orders/${loggedUser?.email}`,
          method: "GET",
          params: params,
        };
      },
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
