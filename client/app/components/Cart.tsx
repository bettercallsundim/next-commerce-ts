"use client";
import { errorToast, successToast } from "@/helpers/toaster";
import { useThrottle } from "@/hooks/debounce";
import useZustand from "@/hooks/useZustand";
import Drawer from "@mui/material/Drawer";

export default function Cart({ open, toggleDrawer }) {
  const { cartItems, addToCart, decreaseFromCart } = useZustand();

  function handleAddToCart(product) {
    addToCart(product);
    successToast("Product Added to Cart");
  }
  function handleDecreaseFromCart(product) {
    decreaseFromCart(product);
    successToast("Product Removed from Cart");
  }

  const throttledAddToCart = useThrottle(handleAddToCart, 3000);
  const throttledDecreaseFromCart = useThrottle(handleDecreaseFromCart, 3000);
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer("right", false)}>
      <div className="w-[300px]">
        {/* @ts-ignore */}
        {cartItems?.map((item) => (
          <div
            key={item.product?._id}
            className="flex justify-between items-center"
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
                  throttledDecreaseFromCart(item?.product);
                }}
              >
                -
              </button>
              <span>{item?.quantity}</span>
              <button
                onClick={() => {
                  throttledAddToCart(item?.product);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
