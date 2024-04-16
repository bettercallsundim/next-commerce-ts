"use client";
import useStore from "@/zustand";
import { Rating } from "@mui/material";
import DottedButton from "./DottedButton";

const Card2 = ({ product }) => {
  const { title, description, price, thumbnail }= product;
  const store = useStore((state) => state);
  return (
    <div className="p-4  w-[12rem] rounded-md bg-sky-100 ">
      <div className="text-center">
        <img
          className="w-full aspect-square object-contain"
          src={thumbnail}
          alt=""
        />
      </div>
      <div className="space-y-2">
        <p className="font-bold text-xs my-0">{title}</p>
        <p className="font-bold text-xs my-0">
          Price : ${price}
          <span className="text-gray-600 ml-1">
            <del>${price + 100}</del>
          </span>
        </p>
        <p className="my-0 flex items-center">
          {" "}
          <Rating size="small" name="read-only" value={4} readOnly />
          <span className="text-gray-500 text-xs ml-1">( 4320 )</span>
        </p>
        <p className="my-0 mt-1" onClick={()=>store.addToCart(product)}>
          <DottedButton text="Add To Cart" size="small" />
        </p>
      </div>
    </div>
  );
};

export default Card2;
