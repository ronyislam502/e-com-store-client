"use client";

import { useStatisticStatsQuery } from "@/src/redux/features/statistic/statisticApi";
import { Card, CardBody, CardHeader } from "@heroui/card";
import CategoryStats from "./_components/CategoryStats";
import ProductStats from "./_components/ProductStats";

const Admin = () => {
  const { data: statistics, isLoading } = useStatisticStatsQuery("");

  if (isLoading || !statistics)
    return <p className="text-center mt-10">Loading...</p>;

  const { categoryStats, productStats } = statistics?.data;

  return (
    <div>
      <h2 className="text-center text-4xl font-bold">Sales Dashboard</h2>
      <h2 className="text-2xl font-bold p-2">
        Revenue:{" "}
        <span className="text-blue-500">${statistics?.data?.grandRevenue}</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/*category-stats */}
        <Card>
          <CardHeader>
            <h3>Category-wise Sales</h3>
          </CardHeader>
          <CardBody>
            <CategoryStats data={categoryStats} />
          </CardBody>
        </Card>
        {/* product-stats */}
        <Card>
          <CardHeader>
            <h3 className="text-center">Product-wise Sales</h3>
          </CardHeader>
          <CardBody>
            <ProductStats data={productStats} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
