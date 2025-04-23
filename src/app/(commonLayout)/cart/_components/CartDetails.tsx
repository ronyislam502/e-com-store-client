import { MinusIcon, PlusIcon, TrashIcon } from "@/src/components/icons";
import {
  removeFromCart,
  updateQuantity,
} from "@/src/redux/features/order/orderSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { TProduct } from "@/src/types/product";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

type TProps = {
  product: TProduct;
};

const CartDetails = ({ product }: TProps) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: string, _id: string) => {
    const payload = { type, _id };

    dispatch(updateQuantity(payload));
  };

  const handleRemove = (_id: string) => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div className="flex items-center justify-between space-x-4 border border-gray-300 rounded-lg p-4 bg-white shadow-md  transform hover:scale-105 hover:shadow-lg w-full  mx-auto">
      <Avatar name="image" src={product?.images[0] || ""} />
      <div className="flex-grow mx-4">
        <h3 className="text-lg font-semibold text-black truncate mb-2">
          {product?.name}
        </h3>
        <p className="text-lg font-bold text-yellow-600">
          ${(product?.price * product?.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          color="danger"
          disabled={product.quantity <= 1}
          size="sm"
          onPress={() => handleQuantity("decrement", product?._id)}
        >
          <MinusIcon />
        </Button>
        <span className="text-lg font-semibold">{product?.quantity}</span>
        <Button
          color="primary"
          size="sm"
          onPress={() => handleQuantity("increment", product?._id)}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button
        color="danger"
        size="sm"
        onPress={() => handleRemove(product?._id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartDetails;
