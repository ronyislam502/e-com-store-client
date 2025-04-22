"use client";

import { TUser } from "@/src/redux/features/auth/authSlice";
import { useUserOrdersQuery } from "@/src/redux/features/order/orderApi";
import { useAppSelector } from "@/src/redux/hooks";
import { formatDate } from "@/src/utils/Date";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import AddReview from "../_component/AddReview";
import { TOrder } from "@/src/types/order";

const Purchase = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: orders } = useUserOrdersQuery(loggedUser?.email);

  return (
    <div>
      <h2>Purchase</h2>
      <div className="text-end mx-10 mb-4">
        {" "}
        <AddReview />
      </div>
      <Table fullWidth aria-label="Product Table">
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>Indx</TableColumn>
          <TableColumn>Order No</TableColumn>
          <TableColumn>Arrive</TableColumn>
          <TableColumn>Payment</TableColumn>
          <TableColumn>TotalPrice</TableColumn>
          <TableColumn>Tax</TableColumn>
          <TableColumn>TotalPay</TableColumn>
        </TableHeader>
        <TableBody>
          {orders?.data?.map((order: TOrder, indx: number) => (
            <TableRow key={order._id}>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{indx + 1}</TableCell>
              <TableCell>{order?.transactionId}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell>$ {order?.totalPrice}</TableCell>
              <TableCell>${order?.tax}</TableCell>
              <TableCell>$ {order?.grandAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Purchase;
