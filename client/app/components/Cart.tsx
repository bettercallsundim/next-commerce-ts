"use client"
import useStore from "@/zustand";
import Drawer from "@mui/material/Drawer";

export default function Cart({open, toggleDrawer}) {
  const store = useStore((state) => state);
  console.log("🚀 ~ Card2 ~ store:", store);
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer("right", false)}>
      <div className="w-[300px]">
        {store.cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <img
                className="w-[50px] h-[50px] object-cover"
                src={item.thumbnail}
                alt=""
              />
            </div>
            <div>
              <p>{item.title}</p>
              <p>${item.price}</p>
            </div>
            <div>
              <button onClick={() => store.decreaseFromCart(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => store.addToCart(item)}>+</button>
            </div>
          </div>

        ))}
      </div>
    </Drawer>
  );
}
