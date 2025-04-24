"use client";

import { useAllOrdersQuery } from "@/src/redux/features/order/orderApi";
import { TOrder } from "@/src/types/order";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const { data: orders } = useAllOrdersQuery({ page, limit });

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-2">Orders</h2>
      <Table fullWidth aria-label="Product Table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Products</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>TotalPrice</TableColumn>
          <TableColumn>Tax</TableColumn>
          <TableColumn>isPayment</TableColumn>
          <TableColumn>isDelivered</TableColumn>
          <TableColumn>TotalPay</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {orders?.data?.data?.map((order: TOrder) => (
            <TableRow key={order._id}>
              <TableCell>{order?.user?.name}</TableCell>
              <TableCell>{order?.user?.email}</TableCell>
              <TableCell>{order?.products?.length}</TableCell>
              <TableCell>{order?.totalQuantity}</TableCell>
              <TableCell>$ {(order?.totalPrice).toFixed(2)}</TableCell>
              <TableCell>$ {(order?.tax).toFixed(2)}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>$ {(order?.grandAmount).toFixed(2)}</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={orders?.meta?.totalPage}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Orders;
