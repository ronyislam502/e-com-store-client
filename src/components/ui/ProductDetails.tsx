import { addToCart } from "@/src/redux/features/order/orderSlice";
import { TProduct } from "@/src/types/product";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type TProps = {
  product: TProduct;
};

const ProductDetails = ({ product }: TProps) => {
  const dispatch = useDispatch();
  const defaultImage = "/loading";
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(product?.images[0]);
    }
  }, [product]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Add to cart successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div>
          <Image
            alt="Product Image"
            className="w-full rounded-lg shadow-md"
            height={200}
            src={selectedImage}
            width={500}
          />
          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-4">
            {product?.images?.map((img, i) => (
              <Image
                key={i}
                alt={`Thumbnail ${i + 1}`}
                className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                height={80}
                src={img}
                width={80}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Details Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{product?.name}</h1>
        <div className="flex gap-4">
          <p className="align-baseline">Brand:{product?.brand}</p>
          <p className="align-baseline">Category: {product?.category?.name}</p>
        </div>
        <div className="flex items-baseline gap-3">
          <p className="font-semibold">Quantity: {product?.quantity}</p>
          <p className="font-semibold">Price: ${product?.price}</p>
        </div>
        <p>{product?.description}</p>
        {/* Add to Cart Button */}
        <Button
          className="w-full"
          color="primary"
          onPress={() => handleAddToCart(product)}
        >
          add To cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
