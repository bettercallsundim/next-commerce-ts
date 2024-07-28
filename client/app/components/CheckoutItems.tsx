import useZustand from "@/hooks/useZustand";
import { Checkbox } from "@mui/material";
import React from "react";

type Props = {};

const CheckoutItems = ({ item }) => {
  const { cartItems, addToCart, decreaseFromCart } = useZustand();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex gap-4 items-center justify-between bg-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
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
  );
};

export default CheckoutItems;
