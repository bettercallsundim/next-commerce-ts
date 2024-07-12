"use client";
import useZustand from "@/hooks/useZustand";
import Drawer from "@mui/material/Drawer";

export default function Cart({ open, toggleDrawer }) {
  const { cartItems, addToCart, decreaseFromCart } = useZustand();
  console.log("store.cartItems", cartItems);
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
              {/* @ts-ignore */}
              <button onClick={() => decreaseFromCart(item)}>-</button>
              <span>{item?.quantity}</span>
              {/* @ts-ignore */}
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
