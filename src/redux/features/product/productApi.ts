import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: ({ category, page, isStock, limit }) => {
        const params = new URLSearchParams();

        if (category) {
          params.append("category", category);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }
        if (isStock) {
          params.append("isStock", isStock);
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
    }),
    singleProduct: builder.query({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/products/update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAllProductsQuery,
  useSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
