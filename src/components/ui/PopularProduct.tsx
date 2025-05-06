import { addToCart } from "@/src/redux/features/order/orderSlice";
import { TPopularProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type TProps = {
  product: TPopularProduct;
};

const PopularProduct = ({ product }: TProps) => {
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
          src={product.images[0] || ""}
          width={400}
        />
      </CardBody>
      <CardFooter className="flex-col items-center text-center bg-white p-2">
        <Link href={`/shop/${product?._id}`}>
          <h3 className="text-md font-bold text-black">
            {product?.name?.slice(0, 30)}
          </h3>
          <div className="flex gap-6">
            <p className="p-2 text-black">Price: ${product?.price}</p>
            <p className="p-2 text-black">TotalSold: {product?.totalSold}</p>
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

export default PopularProduct;
