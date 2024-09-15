"use client";
import { successToast } from "@/helpers/toaster";
import { useDebouncedClick, useThrottle } from "@/hooks/debounce";
import useZustand from "@/hooks/useZustand";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import DottedButton from "./DottedButton";
const Card2 = ({ product }: { product: any }) => {
  const router = useRouter();
  const { name, description, price, category, images, colors, sizes, stock } =
    product;
  const { addToCart } = useZustand();
  function handleAddToCart(product) {
    addToCart(product);
    successToast("Product Added to Cart");
  }
  const throttledAddToCart = useThrottle(handleAddToCart, 3000);
  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
      }}
      className="p-4  w-[12rem] rounded-md bg-sky-100 cursor-pointer"
    >
      <div className="text-center">
        <img
          className="w-full aspect-square object-contain"
          src={images[0].url}
          alt=""
        />
      </div>
      <div className="space-y-2">
        <p className="font-bold text-xs my-0">{name}</p>
        <p className="font-bold text-xs my-0">
          Price : ${price}
          <span className="text-gray-600 ml-1">
            <del>${price}</del>
          </span>
        </p>
        <p className="my-0 flex items-center">
          {" "}
          <Rating size="small" name="read-only" value={4} readOnly />
          <span className="text-gray-500 text-xs ml-1">( 4320 )</span>
        </p>

        <p className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              throttledAddToCart(product);
            }}
            className="bg-sky-500 text-white rounded-md px-4 py-2 font-bold border-none hover:bg-sky-600 hover:text-white cursor-pointer"
          >
            Add To Cart
          </button>
          {/* <DottedButton
            onClick={(e) => {
              e.stopPropagation();
              throttledAddToCart(product);
            }}
            text="Add To Cart"
            size="small"
          /> */}
        </p>
      </div>
    </div>
  );
};

export default Card2;
