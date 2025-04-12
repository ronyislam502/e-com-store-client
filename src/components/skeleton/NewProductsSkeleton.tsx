"use client";

import ProductCard from "../ui/ProductCard";
import { TProduct } from "@/src/types/product";
import { useAllProductsQuery } from "@/src/redux/features/product/productApi";

const NewProductsSkeleton = () => {
  const { data: products } = useAllProductsQuery("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {products?.data
        ?.slice(0, 4)
        .map((product: TProduct) => (
          <ProductCard key={product?._id} product={product} />
        ))}
    </div>
  );
};

export default NewProductsSkeleton;
