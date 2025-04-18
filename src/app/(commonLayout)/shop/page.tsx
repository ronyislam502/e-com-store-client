"use client";

import { useAllProductsQuery } from "@/src/redux/features/product/productApi";
import { useState } from "react";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import { TCategory, TProduct } from "@/src/types/product";
import { Pagination } from "@heroui/pagination";
import ProductCard from "@/src/components/ui/ProductCard";
import ShopSkeleton from "@/src/components/skeleton/ShopSkeleton";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";

const Shop = () => {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(8);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories } = useAllCategoriesQuery("");

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery({
    category,
    page,
    limit,
    sort,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="items-center">
      <h2 className="text-center">Shop</h2>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="col-span-1">
          {" "}
          <div className="mt-10">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <SelectItem key="">All</SelectItem>
              {categories?.data?.map((category: TCategory) => (
                <SelectItem key={category?._id}>{category?.name}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="col-span-5">
          {isLoadingProducts && <ShopSkeleton />}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
            {products?.data?.map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-10">
            <Pagination
              isCompact
              showControls
              initialPage={page}
              total={products?.meta?.totalPage ?? 8}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
