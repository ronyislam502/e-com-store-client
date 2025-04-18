import { TProduct } from "./product";
import { TUser } from "./user";

export type TOrder = {
  _id: string;
  user: TUser;
  products: TProduct[];
  totalQuantity: number;
  totalPrice: number;
  tax: number;
  status: string;
  transactionId: string;
  paymentStatus: string;
  grandAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
