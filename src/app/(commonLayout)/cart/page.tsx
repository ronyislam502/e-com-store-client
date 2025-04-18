"use client";

import { useAppSelector } from "@/src/redux/hooks";
import { TProduct } from "@/src/types/product";
import CartDetails from "./_components/CartDetails";
import OrderSummary from "./_components/OrderSummary";

const Cart = () => {
  const products = useAppSelector((state) => state.cart.products) as TProduct[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
      <div className="col-span-4">
        {products.length ? (
          products.map((product: TProduct) => (
            <CartDetails key={product?._id} product={product} />
          ))
        ) : (
          <p className="text-2xl text-red-500 text-center">
            {" "}
            not product found
          </p>
        )}
      </div>
      <div className="col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
