import { successToast } from "@/helpers/toaster";
import useZustand from "@/hooks/useZustand";
import { Checkbox } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

type Props = {};

const CheckoutItems = ({
  item: iitem,
  checkoutItems = [],
  setCheckoutItems = () => {},
  isCheckout = false,
}) => {
  const { cartItems, addToCart, decreaseFromCart } = useZustand();
  const [item, setItem] = useState(iitem);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleCheck = (item) => {
    let found = checkoutItems.findIndex(
      (i) => i.product._id === item.product._id
    );
    if (found !== -1) {
      setCheckoutItems(
        checkoutItems.filter((i) => i.product._id !== item.product._id)
      );
    } else {
      setCheckoutItems([...checkoutItems, item]);
    }
  };

  const addToCheckoutItems = (item) => {
    let found = checkoutItems.findIndex(
      (i) => i.product._id === item.product._id
    );
    if (found !== -1) {
      setCheckoutItems(
        checkoutItems.map((i) => {
          if (i.product._id === item.product._id) {
            setItem({ ...i, quantity: i.quantity + 1 });
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        })
      );
    }
  };

  const decreaseFromCheckoutItems = (item) => {
    let found = checkoutItems.findIndex(
      (i) => i.product._id === item.product._id
    );
    if (found !== -1) {
      let items = checkoutItems.map((i) => {
        if (i.product._id === item.product._id && i.quantity > 1) {
          setItem({ ...i, quantity: i.quantity - 1 });
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return i;
        }
      });
      // items = items.filter((item) => item !== null);
      setCheckoutItems(items);
    }
  };

  if (!isCheckout) {
    return (
      <div className="flex gap-4 items-center justify-between bg-slate-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <div>
            <Checkbox
              checked={checked}
              onChange={(e) => {
                handleChange(e);
                handleCheck(item);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <img
              className="w-[50px] h-[50px] object-cover rounded-md"
              src={
                item?.product?.images?.length > 0
                  ? item?.product?.images[0]?.url
                  : ""
              }
              alt=""
            />
          </div>
          <div className="flex items-center gap-2">
            <p>{item?.product?.name}</p>
            <p>${item?.product?.price}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              decreaseFromCheckoutItems(item);
            }}
          >
            -
          </button>
          <span>{item?.quantity}</span>
          <button
            onClick={() => {
              addToCheckoutItems(item);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-4 items-center justify-between bg-slate-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="w-[50px] h-[50px] object-cover rounded-md"
              src={
                item?.product?.images?.length > 0
                  ? item?.product?.images[0]?.url
                  : ""
              }
              alt=""
            />
          </div>
          <div className="flex items-center gap-2">
            <p>{item?.product?.name}</p>
            <p>${item?.product?.price}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default memo(CheckoutItems);
