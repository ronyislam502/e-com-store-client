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
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import AddProduct from "./_component/AddProduct";
import EditProduct from "./_component/EditProduct";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { VerticalDotsIcon } from "@/src/components/icons";
import DeleteProduct from "./_component/DeleteProduct";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isStock, setIsStock] = useState("");
  const [limit] = useState(8);

  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategoriesQuery({});

  const { data: products, isLoading: isLoadingProducts } = useAllProductsQuery({
    category,
    page,
    isStock,
    limit,
  });

  console.log("pp", products?.meta?.total);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2>Total:{products?.meta?.total}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <Input
          className="w-full p-2 border rounded"
          placeholder="Search products..."
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div>
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
        </div>
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
              <TableColumn className="font-bold">Index</TableColumn>
              <TableColumn>Image</TableColumn>
              <TableColumn>
                <span className="ms-28">Name</span>
              </TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Stock</TableColumn>
              <TableColumn>
                <span className="ms-10">Actions</span>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {products?.data?.map((product: TProduct, idx: any) => (
                <TableRow key={product._id}>
                  <TableCell>{idx + 1}</TableCell>
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
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>
                    {product?.isStock ? "In Stock" : "Out of Stock"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <EditProduct />
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
