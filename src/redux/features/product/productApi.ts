import { TQueryParam } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: ({ category, page, isStock, limit, sort, brands }) => {
        const params = new URLSearchParams();

        if (category) {
          params.append("category", category);
        }

        if (sort) {
          params.append("sort", sort);
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
      providesTags: ["product"],
    }),
    singleProduct: builder.query({
      query: (args) => ({
        url: `/products/${args?.id}`,
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
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/products/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    getAllProducts: builder.query({
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
  }),
});

export const {
  useAllProductsQuery,
  useSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} = productApi;
