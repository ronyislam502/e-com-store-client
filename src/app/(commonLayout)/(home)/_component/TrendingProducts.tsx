"use client";

import PopularProduct from "@/src/components/ui/PopularProduct";
import { useTrendingProductsQuery } from "@/src/redux/features/order/orderApi";
import { TPopularProduct, TProduct } from "@/src/types/product";

const TrendingProducts = () => {
  const { data: products } = useTrendingProductsQuery("");

  return (
    <div className="mx-10">
      <h2 className="text-center text-2xl font-bold my-6">Trending products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {products?.data
          ?.slice(0, 8)
          .map((product: TPopularProduct) => (
            <PopularProduct key={product?._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
