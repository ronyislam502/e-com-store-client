"use client";

import ProductDetails from "@/src/components/ui/ProductDetails";
import { useSingleProductQuery } from "@/src/redux/features/product/productApi";
import { use } from "react";

const Details = ({ params }: { params: Promise<{ id: string }> }) => {
  const id = use(params);
  const { data: product } = useSingleProductQuery(id);

  return (
    <div>
      <ProductDetails product={product?.data} />
    </div>
  );
};

export default Details;
