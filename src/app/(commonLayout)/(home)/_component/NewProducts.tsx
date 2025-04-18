"use client";

import NewProductsSkeleton from "@/src/components/skeleton/NewProductsSkeleton";
import ProductCard from "@/src/components/ui/ProductCard";
import { useAllProductsQuery } from "@/src/redux/features/product/productApi";
import { TProduct } from "@/src/types/product";

const NewProducts = () => {
  const { data: products, isLoading: isLoadingProducts } =
    useAllProductsQuery("");

  return (
    <div className="mx-10">
      <h2 className="text-center text-2xl font-bold my-6">new products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {products?.data
          ?.slice(0, 4)
          .map((product: TProduct) => (
            <ProductCard key={product?._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default NewProducts;
