import { addToCart } from "@/src/redux/features/order/orderSlice";
import { TProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type TProps = {
  product: TProduct;
};

const ProductCard = ({ product }: TProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Add to cart successfully");
  };

  return (
    <Card className="shadow-2xl">
      <CardBody className="overflow-visible bg-white">
        <Image
          alt={""}
          className="object-cover"
          height={296}
          src={product?.images[0] || ""}
          width={350}
        />
      </CardBody>
      <CardFooter className="flex-col items-center bg-white ">
        <h1 className="text-sm font-bold text-black">{product?.name}</h1>
        <p className="p-2 text-black">Price: ${product?.price}</p>
        <Button color="primary" onPress={() => handleAddToCart(product)}>
          add To cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
