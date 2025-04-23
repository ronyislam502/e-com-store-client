"use client";

import PopularProduct from "@/src/components/ui/PopularProduct";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { useTrendingProductsQuery } from "@/src/redux/features/order/orderApi";
import { TPopularProduct } from "@/src/types/product";

const TrendingProducts = () => {
  const { data: products } = useTrendingProductsQuery("");

  return (
    <div className="py-10">
      <SectionTitle heading="trending products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-16">
        {products?.data
          ?.slice(0, 4)
          .map((product: TPopularProduct) => (
            <PopularProduct key={product?._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
