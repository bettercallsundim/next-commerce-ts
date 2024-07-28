"use client";
import CheckoutItems from "@/app/components/CheckoutItems";
import Container from "@/app/components/Container";
import { successToast } from "@/helpers/toaster";
import useZustand from "@/hooks/useZustand";
import { Button, Checkbox } from "@mui/material";
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
            <div className="cart bg-slate-100 rounded-lg p-4">
              {" "}
              {cartItems?.map((item, idx) => (
                <CheckoutItems key={item.product?._id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </div>
        </div>
        <div className="w-[35%] h-full bg-slate-200"></div>
      </div>
    </Container>
  );
};

export default Page;
