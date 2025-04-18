"use client";

import EForm from "@/src/components/form/EForm";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAddOrderMutation } from "@/src/redux/features/order/orderApi";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TProduct } from "@/src/types/product";
import { TUser } from "@/src/types/user";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { toast } from "sonner";

const CheckOut = () => {
  const [createOrder] = useAddOrderMutation();
  const loggedUser = useAppSelector(selectCurrentUser) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart?.products;

  const onSubmit = async () => {
    const orderData = {
      user: user?._id,
      products: cartItems?.map((product: TProduct) => ({
        product: product._id,
        quantity: product.quantity,
      })),
    };

    const res = await createOrder(orderData).unwrap();

    if (res?.success) {
      window.location.href = res?.data;
      toast.success(res?.message, { duration: 2000 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-black">
      <h3 className="my-2 text-2xl font-bold text-center">Checkout</h3>
      <div>
        <h2 className="center">User Info</h2>
        <EForm onSubmit={onSubmit}>
          <div className="flex gap-4 py-3">
            <Input label="Name" name="name" type="text" value={user?.name} />
            <Input
              label="Email"
              name="email"
              type="email"
              value={user?.email}
            />
          </div>
          <div className="flex gap-4 py-3">
            <Input label="Phone" name="phone" type="text" value={user?.phone} />
            <Input
              label="Address"
              name="address"
              type="text"
              value={user?.address}
            />
          </div>
          <div>
            <h2 className="text-center">Order Summary</h2>
            <div className="flex">
              <Table fullWidth aria-label="Product Table">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>ProductQuantity</TableColumn>
                  <TableColumn>ProductPrice</TableColumn>
                  <TableColumn>Tax</TableColumn>
                  <TableColumn>TotalPrice</TableColumn>
                </TableHeader>
                <TableBody>
                  {cartItems?.map((product: TProduct) => (
                    <TableRow key={product?._id}>
                      <TableCell>{product?.name}</TableCell>
                      <TableCell>
                        <span className="ms-4">{product?.quantity}</span>
                      </TableCell>
                      <TableCell>
                        $ {product?.price * product?.quantity}
                      </TableCell>
                      <TableCell>
                        ${" "}
                        {(product?.price * product?.quantity * 0.1).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        ${" "}
                        {(
                          parseFloat(
                            (product?.price * product?.quantity * 0.1).toFixed(
                              2
                            )
                          ) +
                          product?.price * product?.quantity
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex gap-6 mt-10 text-xl">
            <h1>TotalTax:$ {(cart?.tax).toFixed(2)}</h1>
            <h1>TotalPay:$ {(cart?.grandTotal).toFixed(2)}</h1>
          </div>
          <div className="text-end">
            <Button color="success" size="md" type="submit">
              Process to payment
            </Button>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default CheckOut;
