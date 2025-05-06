"use client";

import { useAllProductsQuery } from "@/src/redux/features/product/productApi";
import { useState } from "react";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import { TCategory, TProduct } from "@/src/types/product";
import { Pagination } from "@heroui/pagination";
import ProductCard from "@/src/components/ui/ProductCard";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";
import { useDebounce } from "@/src/utils/DebaounceHook";
import CardSkeleton from "@/src/components/skeleton/CardSkeleton";

const Shop = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
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
    <div className="items-center text-center mb-10">
      <h2 className="text-center text-xl font-bold">Our Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-6 px-10">
        <div className="col-span-1">
          {" "}
          <div className="mt-20">
            <div className="py-3">
              <Input
                color="primary"
                label="Search"
                size="md"
                type="text"
                value={search}
                variant="faded"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="py-3">
              <Select
                color="primary"
                label="Category"
                value={category}
                variant="faded"
                onChange={(e) => setCategory(e.target.value)}
              >
                <SelectItem key="">All</SelectItem>
                {isLoading ? (
                  <SelectItem>
                    <Spinner />
                  </SelectItem>
                ) : (
                  categories?.data?.map((category: TCategory) => (
                    <SelectItem key={category?._id}>
                      {category?.name}
                    </SelectItem>
                  ))
                )}
              </Select>
            </div>
            <div className="py-3">
              <Select
                color="primary"
                label="Sort By Price"
                size="md"
                value={sort}
                variant="faded"
                onChange={(e) => setSort(e.target.value)}
              >
                <SelectItem key="">All</SelectItem>
                <SelectItem key="price">Low to High</SelectItem>
                <SelectItem key="-price">High to Low</SelectItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 px-10">
            {isLoadingProducts ? (
              <CardSkeleton count={6} />
            ) : (
              products?.data?.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
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
