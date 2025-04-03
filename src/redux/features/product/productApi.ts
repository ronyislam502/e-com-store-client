import { TQueryParam } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((product: TQueryParam) => {
            params.append(product.name, product?.value as string);
          });
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
