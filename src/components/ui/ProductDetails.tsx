import { TProduct } from "@/src/types/product";
import Image from "next/image";

type TProps = {
  product: TProduct;
};

const ProductDetails = ({ product }: TProps) => {
  return (
    <div>
      <h2>{product?.name}</h2>
      <div className="flex-1 flex flex-col items-center">
        {product?.images ? (
          <Image
            alt={product?.name}
            className="w-64 h-auto object-contain border rounded-md shadow-md"
            height={100}
            src={product.images[0]}
            width={200}
          />
        ) : (
          <div className="w-64 h-96 flex items-center justify-center border rounded-md bg-gray-100 text-gray-500">
            No Image Available
          </div>
        )}

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4">
          {product?.images?.map((img, index) =>
            img ? (
              <Image
                key={index}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 border rounded-md object-cover cursor-pointer hover:scale-105 transition"
                height={100}
                src={img}
                width={200}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
