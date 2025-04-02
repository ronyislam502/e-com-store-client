import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSingleUserQuery } = userApi;
