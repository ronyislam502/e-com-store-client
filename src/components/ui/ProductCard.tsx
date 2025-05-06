import { addToCart } from "@/src/redux/features/order/orderSlice";
import { TProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
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
          width={400}
        />
      </CardBody>
      <CardFooter className="flex-col items-center text-center bg-white px-4">
        <Link href={`/shop/${product?._id}`}>
          <h3 className="text-md font-bold text-black">
            {product?.name?.slice(0, 30)}
          </h3>
          <p className="text-sm text-black">
            {product?.description?.slice(0, 49)}.....
            <span className="text-blue-500">more</span>
          </p>
          <div className="flex justify-between py-2">
            <p className="text-black">Price: ${product?.price}</p>
            <p className="text-black">Brand: {product?.brand}</p>
          </div>
        </Link>
        <div className="py-2">
          <Button color="primary" onPress={() => handleAddToCart(product)}>
            add To cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
