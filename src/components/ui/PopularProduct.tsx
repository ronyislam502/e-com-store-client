import { TPopularProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
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
      <CardFooter className="flex-col items-center bg-white ">
        <h1 className="text-sm font-bold text-black">{product?.name}</h1>
        <p className="p-2 text-black">Price: ${product?.price}</p>
        <Button color="primary">add To cart</Button>
      </CardFooter>
    </Card>
  );
};

export default PopularProduct;
