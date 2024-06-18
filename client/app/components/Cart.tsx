"use client";
import useZustand from "@/hooks/useZustand";
import Drawer from "@mui/material/Drawer";

export default function Cart({ open, toggleDrawer }) {
  const store = useZustand();
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer("right", false)}>
      <div className="w-[300px]">
        {/* @ts-ignore */}
        {store.cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center">
            <div>
              <img
                className="w-[50px] h-[50px] object-cover"
                src={item.images[0]}
                alt=""
              />
            </div>
            <div>
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <div>
              {/* @ts-ignore */}
              <button onClick={() => store.decreaseFromCart(item)}>-</button>
              <span>{item.quantity}</span>
              {/* @ts-ignore */}
              <button onClick={() => store.addToCart(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
