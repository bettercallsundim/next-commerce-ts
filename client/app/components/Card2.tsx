"use client";
import useZustand from "@/hooks/useZustand";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import DottedButton from "./DottedButton";
const Card2 = ({ product }: { product: any }) => {
  const router = useRouter();
  const { name, description, price, category, images, colors, sizes, stock } =
    product;
  const { addToCart } = useZustand();
  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
      }}
      className="p-4  w-[12rem] rounded-md bg-sky-100 "
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
        {/* @ts-ignore */}

        <p
          className="my-0 mt-1"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <DottedButton text="Add To Cart" size="small" />
        </p>
      </div>
    </div>
  );
};

export default Card2;
