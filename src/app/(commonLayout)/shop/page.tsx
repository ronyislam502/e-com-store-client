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
import { Input } from "@heroui/input";
import { useDebounce } from "@/src/utils/DebaounceHook";

const Shop = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [sort, setSort] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: categories, isLoading } = useAllCategoriesQuery({});

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery({
    page,
    limit,
    category,
    search: debouncedSearch,
    sort,
  });

  return (
    <div className="items-center mb-10">
      <h2 className="text-center text-xl font-bold">Our Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="col-span-1">
          {" "}
          <div className="mt-10">
            <Input
              className="max-w-xs"
              label="Search"
              size="md"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              className="mt-2"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <SelectItem key="">All</SelectItem>
              {isLoading ? (
                <SelectItem>
                  <Spinner />
                </SelectItem>
              ) : (
                categories?.data?.map((category: TCategory) => (
                  <SelectItem key={category?._id}>{category?.name}</SelectItem>
                ))
              )}
            </Select>
            <Select
              className="max-w-xs mt-2"
              label="Sort By Price"
              size="md"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <SelectItem key="">All</SelectItem>
              <SelectItem key="price">Low to High</SelectItem>
              <SelectItem key="-price">High to Low</SelectItem>
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
          <div className="flex justify-center mt-6 text-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={products?.meta?.totalPage}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
