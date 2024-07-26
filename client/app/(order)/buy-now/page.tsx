"use client";
import Container from "@/app/components/Container";
import { successToast } from "@/helpers/toaster";
import useZustand from "@/hooks/useZustand";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { cartItems, addToCart, decreaseFromCart } = useZustand();

  return (
    <Container>
      <div className="flex items-center justify-between">
        {" "}
        <div className="w-[65%]">
          <h1>Buy Now</h1>
          <div>
            <div className="cart bg-slate-200 rounded-lg p-4">
              {" "}
              {cartItems?.map((item) => (
                <div
                  key={item.product?._id}
                  className="flex gap-x-4 items-center"
                >
                  <div>
                    <img
                      className="w-[50px] h-[50px] object-cover"
                      src={
                        item?.product?.images?.length > 0
                          ? item?.product?.images[0]?.url
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{item?.product?.name}</p>
                    <p>${item?.product?.price}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        decreaseFromCart(item?.product);
                        successToast("Product Removed from Cart");
                      }}
                    >
                      -
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => {
                        addToCart(item?.product);
                        successToast("Product Added to Cart");
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[35%] h-full bg-slate-200"></div>
      </div>
    </Container>
  );
};

export default Page;
