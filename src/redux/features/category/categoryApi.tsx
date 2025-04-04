import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    singleCategory: builder.query({
      query: (args) => ({
        url: `/categories/${args.id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: (args) => ({
        url: `/categories/update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (args) => ({
        url: `/categories/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useSingleCategoryQuery,
} = categoryApi;
