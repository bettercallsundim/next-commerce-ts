"use client";
import CheckoutItems from "@/app/components/CheckoutItems";
import Container from "@/app/components/Container";
import { useCreateOrder } from "@/hooks/queries";
import useZustand from "@/hooks/useZustand";
import { Button } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const { checkoutItems } = useZustand();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { createOrder } = useCreateOrder();
  return (
    <Container>
      <h1>Checkout</h1>
      <div className="flex items-center justify-between">
        <div className="w-[65%]">
          <h1>Buy Now</h1>
          <div>
            <div className="cart bg-slate-100 rounded-lg p-4">
              {" "}
              {checkoutItems?.map((item, idx) => (
                <CheckoutItems
                  key={item.product?._id}
                  item={item}
                  isCheckout={true}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[35%] h-full bg-slate-200">
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            {checkoutItems.length > 0 &&
              checkoutItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{item.product?.name}</span> <span>{item.quantity}</span>{" "}
                  <span>{item.price}</span>{" "}
                  <span>{item.quantity * item.product?.price}</span>
                </div>
              ))}
          </div>
          <div>Total Price: 123</div>
          <div>
            <Button
              onClick={() => {
                createOrder({ products: checkoutItems, address, phone });
              }}
              variant="contained"
              color="primary"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
