import { TQueryParam } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
    }),
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
  }),
});

export const { useSingleUserQuery, useAllUsersQuery } = userApi;
