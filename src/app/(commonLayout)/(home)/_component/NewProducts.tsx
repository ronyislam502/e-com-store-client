"use client";

import CardSkeleton from "@/src/components/skeleton/CardSkeleton";
import ProductCard from "@/src/components/ui/ProductCard";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { useNewProductQuery } from "@/src/redux/features/product/productApi";
import { TProduct } from "@/src/types/product";

const NewProducts = () => {
  const { data: newProducts, isLoading } = useNewProductQuery("");

  return (
    <div className="py-10">
      <SectionTitle heading="new products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-10">
        {isLoading ? (
          <CardSkeleton count={4} />
        ) : (
          newProducts?.data
            ?.slice(0, 4)
            .map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default NewProducts;
