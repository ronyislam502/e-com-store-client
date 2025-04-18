"use client";

import { CreditCardIcon, TrashIcon } from "@/src/components/icons";
import { clearCart } from "@/src/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tax, taxRate, grandTotal, totalPrice, selectedItems } =
    useAppSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className=" w-full h-full bg-primary bg-opacity-35 border-l-4 pl-4 rounded p-2">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="text-3xl font-bold text-dark text-center">
              <span className="ms-16">Order Summary</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-dark mt-4">Total Quantity:</td>
            <td className="text-dark mt-4 text-right font-semibold">
              {selectedItems}
            </td>
          </tr>
          <tr>
            <td className="text-dark">Total Price:</td>
            <td className="text-dark text-right font-semibold">
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="text-dark">Tax ({taxRate * 100}%):</td>
            <td className="text-dark text-right font-semibold">
              ${tax.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="text-xl font-semibold text-dark pt-4">
              Grand Total:
            </td>
            <td className="text-xl font-semibold text-dark mt-2 text-right">
              ${grandTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 pb-6">
        {" "}
        <button
          className="border border-red-400 px-3 py-2 text-back  mt-2 rounded-md w-full text-xs flex justify-between items-center mb-4"
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
        >
          <span>Clear Cart</span>
          <TrashIcon />
        </button>
        <button
          className="bg-black px-3 py-2 text-white  mt-2 rounded-md w-full text-xs flex justify-between items-center"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/cart/checkOut");
          }}
        >
          <span>Proceed Checkout</span>
          <CreditCardIcon />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
