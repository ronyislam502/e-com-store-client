import { TQueryParam } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((user: TQueryParam) => {
            params.append(user.name, user?.value as string);
          });
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
    }),
    singleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useAllUsersQuery, useSingleUserQuery, useUpdateUserMutation } =
  userApi;
