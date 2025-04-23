import { baseApi } from "../../api/baseApi";

const statisticApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    statisticStats: builder.query({
      query: () => ({
        url: "/orders/statistic",
        method: "GET",
      }),
      providesTags: ["statistic"],
    }),
  }),
});

export const { useStatisticStatsQuery } = statisticApi;
