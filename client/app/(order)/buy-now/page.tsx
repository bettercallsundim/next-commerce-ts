"use client";
import CheckoutItems from "@/app/components/CheckoutItems";
import Container from "@/app/components/Container";
import { successToast } from "@/helpers/toaster";
import { myAxios } from "@/hooks/queries";
import useZustand from "@/hooks/useZustand";
import { Button, Checkbox } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const {
    cartItems,
    addToCart,
    decreaseFromCart,
    setCheckoutItems: setCheckoutItemsInStore,
  } = useZustand();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [listItems, setListItems] = useState(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("product");
  console.log("🚀 ~ Page ~ search:", search);
  async function fetchProduct(id) {
    myAxios.get(`/product/${id}`).then((res) => {
      setListItems([
        {
          product: res.data.data,
          quantity: 1,
        },
      ]);
    });
  }
  console.log("🚀 ~ Page ~ checkoutItems:", checkoutItems);
  useEffect(() => {
    if (search) {
      fetchProduct(search);
    }
  }, [search]);
  useEffect(() => {
    setCheckoutItemsInStore(checkoutItems);
    let total = 0;
    checkoutItems.forEach((item) => {
      total += item.quantity * item.product?.price;
    });
    setTotalPrice(total);
  }, [checkoutItems, setCheckoutItemsInStore]);

  return (
    <Container>
      <div className="flex items-center justify-between">
        {" "}
        <div className="w-[65%]">
          <h1>Buy Now</h1>
          <div>
            <div className="cart bg-slate-100 rounded-lg p-4">
              {" "}
              {listItems?.map((item, idx) => (
                <CheckoutItems
                  key={item.product?._id}
                  item={item}
                  checkoutItems={checkoutItems}
                  setCheckoutItems={setCheckoutItems}
                />
              ))}
            </div>
          </div>
          <div>
            <Button
              onClick={() => {
                router.push("/checkout");
              }}
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
        <div className="w-[35%] h-full bg-slate-200">
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
          <div>Total Price: {totalPrice}</div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
