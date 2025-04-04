/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryFn,
  DefinitionType
> = async (args, api, extraOption): Promise<any> => {
  let result = await baseQuery(args, api, extraOption);

  if (result?.error?.status === 404) {
    toast.error((result.error?.data as { message: string }).message);
  }

  if (result.error?.status === 403) {
    toast.error((result.error?.data as { message: string }).message);
  }

  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    const res = await fetch("http://localhost:7000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(setUser({ user: user, token: data?.data?.accessToken }));
      result = await baseQuery(args, api, extraOption);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["auth", "product", "category", "department", "user"],
  endpoints: () => ({}),
});
