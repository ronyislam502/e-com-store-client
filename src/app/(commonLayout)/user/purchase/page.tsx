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
import { Pagination } from "@heroui/pagination";
import { useState } from "react";
import TableSkeleton from "@/src/components/skeleton/TableSkeleton";

const Purchase = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: orders, isLoading } = useUserOrdersQuery({
    loggedUser,
    page,
    limit,
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-2">Purchase History</h2>
      <div className="text-end mx-10 mb-4">
        {" "}
        <AddReview />
      </div>
      <div>
        {isLoading ? (
          <TableSkeleton columns={7} rowCount={limit} />
        ) : (
          <Table fullWidth aria-label="Product Table">
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Order No</TableColumn>
              <TableColumn>Arrive</TableColumn>
              <TableColumn>Payment</TableColumn>
              <TableColumn>TotalPrice</TableColumn>
              <TableColumn>Tax</TableColumn>
              <TableColumn>TotalPay</TableColumn>
            </TableHeader>
            <TableBody>
              {orders?.data?.data?.map((order: TOrder) => (
                <TableRow key={order._id}>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order?.transactionId}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell>{order?.paymentStatus}</TableCell>
                  <TableCell>${(order?.totalPrice).toFixed(2)}</TableCell>
                  <TableCell>${(order?.tax).toFixed(2)}</TableCell>
                  <TableCell>${(order?.grandAmount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex justify-center mt-6 text-center">
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

export default Purchase;
