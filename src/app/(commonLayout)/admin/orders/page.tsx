"use client";

import { useAllOrdersQuery } from "@/src/redux/features/order/orderApi";
import { TOrder } from "@/src/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

const Orders = () => {
  const { data: orders } = useAllOrdersQuery("");

  return (
    <div>
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
          {orders?.data?.map((order: TOrder) => (
            <TableRow key={order._id}>
              <TableCell>{order?.user?.name}</TableCell>
              <TableCell>{order?.user?.email}</TableCell>
              <TableCell>{order?.products?.length}</TableCell>
              <TableCell>{order?.totalQuantity}</TableCell>
              <TableCell>$ {order?.totalPrice}</TableCell>
              <TableCell>$ {order?.tax}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>$ {(order?.grandAmount).toFixed(2)}</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
