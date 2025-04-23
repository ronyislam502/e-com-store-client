"use client";

import { useAppSelector } from "@/src/redux/hooks";
import React from "react";
import { ShoppingCartIcon } from "../icons";

const CartCondition = () => {
  const products = useAppSelector((store) => store.cart.products);

  return (
    <div className="flex">
      <ShoppingCartIcon />
      <span className="text-green-400 font-bold">{products?.length}</span>
    </div>
  );
};

export default CartCondition;
