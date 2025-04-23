import { TPopularProduct } from "@/src/types/product";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";

type TProps = {
  product: TPopularProduct;
};

const PopularProduct = ({ product }: TProps) => {
  return (
    <Card className="shadow-2xl">
      <CardBody className="overflow-visible bg-white">
        <Image
          alt={""}
          className="object-cover"
          height={296}
          src={product.images[0] || ""}
          width={350}
        />
      </CardBody>
      <CardFooter className="flex-col items-center bg-white p-2">
        <h3 className="text-md font-bold text-black">
          {product?.name?.slice(0, 30)}
        </h3>
        <div className="flex gap-6">
          <p className="p-2 text-black">Price: ${product?.price}</p>
          <p className="p-2 text-black">TotalSold: {product?.totalSold}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PopularProduct;
