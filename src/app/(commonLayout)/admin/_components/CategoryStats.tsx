import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CategoryStats = ({ data }: { data: any[] }) => {
  const formattedData = data?.map((item) => ({
    category: item?.category,
    totalRevenue: item?.Paid?.totalRevenue,
    totalSold: item?.Paid?.totalSold,
  }));

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart data={formattedData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalRevenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryStats;
