"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useAllProductsQuery } from "@/src/redux/features/product/productApi";
import { useState } from "react";
import { useAllCategoriesQuery } from "@/src/redux/features/category/categoryApi";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { TCategory, TProduct } from "@/src/types/product";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import AddProduct from "./_component/AddProduct";
import EditProduct from "./_component/EditProduct";
import DeleteProduct from "./_component/DeleteProduct";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { useDebounce } from "@/src/utils/DebaounceHook";

export const columns = [
  { name: "Avatar", uid: "avatar" },
  { name: "NAME", uid: "name" },
  { name: "Category", uid: "category" },
  { name: "Price", uid: "price" },
  { name: "Quantity", uid: "quantity" },
  { name: "isStock", uid: "isStock" },
];

const ProductManagement = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isStock, setIsStock] = useState("");
  const [limit] = useState(3);
  const debouncedSearch = useDebounce(search, 500);

  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategoriesQuery({});

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery({
    page,
    isStock,
    limit,
    category,
    search: debouncedSearch,
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-2">Product Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <Input
          className="max-w-xs"
          label="Search"
          size="md"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <SelectItem key="">All</SelectItem>
          {isLoadingCategories ? (
            <SelectItem>
              <Spinner />
            </SelectItem>
          ) : (
            categories?.data?.map((category: TCategory) => (
              <SelectItem key={category?._id}>{category.name}</SelectItem>
            ))
          )}
        </Select>
        <div>
          <Select
            label="Stock Status"
            value={isStock}
            onChange={(e) => setIsStock(e.target.value)}
          >
            <SelectItem key="">All</SelectItem>
            <SelectItem key="true">In Stock</SelectItem>
            <SelectItem key="false">Out of Stock</SelectItem>
          </Select>
        </div>
        <AddProduct />
      </div>
      <div>
        {isLoadingProducts ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Table fullWidth aria-label="Product Table">
            <TableHeader>
              <TableColumn>Image</TableColumn>
              <TableColumn>
                <span className="ms-28">Name</span>
              </TableColumn>
              <TableColumn>
                <span className="ms-6">Category</span>
              </TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Stock</TableColumn>
              <TableColumn>
                <span className="ms-10">Actions</span>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {products?.data?.map((product: TProduct) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Avatar
                      className="cursor-pointer"
                      name="images"
                      src={product?.images[0] || ""}
                    />
                  </TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.category?.name}</TableCell>
                  <TableCell>${product?.price}</TableCell>
                  <TableCell>
                    <span className="ms-4">{product?.quantity}</span>
                  </TableCell>
                  <TableCell>
                    {product?.isStock ? "In Stock" : "Out of Stock"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/admin/productManagement/${product._id}`}>
                      <h2>details</h2>
                    </Link>
                    <EditProduct product={product} />
                    <DeleteProduct product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={products?.meta?.totalPage ?? 8}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
