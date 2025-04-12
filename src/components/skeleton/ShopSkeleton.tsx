"use client";

import { useAllProductsQuery } from "@/src/redux/features/product/productApi";
import { TProduct } from "@/src/types/product";
import CardSkeleton from "./CardSkeleton";

const ShopSkeleton = () => {
  const { data: products } = useAllProductsQuery("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
      {" "}
      {products?.data
        ?.slice(0, 8)
        ?.map((product: TProduct) => <CardSkeleton key={product._id} />)}
    </div>
  );
};

export default ShopSkeleton;
