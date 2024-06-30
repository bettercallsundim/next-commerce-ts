import { myAxios } from "@/hooks/queries";
import { create } from "zustand";
import { CartItem } from "./../../server/src/types/index";

interface ZustandStates {
  cartItemsNumber: number;
  cartItems: CartItem[];
  user: any;
  setUser: (user: any) => void;
  addToCart: (item: any) => void;
  decreaseFromCart: (item: any) => void;
}
async function updateCart(cart: CartItem[]) {
  await myAxios
    .post(
      "/user/manage-cart",
      { cart },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res, "manage cart");
    });
}

const zustandStore = create<ZustandStates>((set) => ({
  cartItemsNumber: 0,
  cartItems: [],
  user: null,
  setUser: (user: any) => set({ user }),
  setCart: (cartItems: CartItem[]) => set({ cartItems }),
  addToCart: async (item: any) => {
    let items: CartItem[] | [] = [];
    set((state: any) => {
      items = state.cartItems;
      let itemFound = items.findIndex((i: any) => i._id === item._id);
      if (itemFound !== -1) {
        items[itemFound].quantity += 1;
        return { cartItems: items, cartItemsNumber: state.cartItemsNumber + 1 };
      } else {
        return {
          cartItems: [...items, { ...item, quantity: 1 }],
          cartItemsNumber: state.cartItemsNumber + 1,
        };
      }
    });
    await updateCart(items);
  },
  decreaseFromCart: async (item: any) => {
    let items: CartItem[] | [] = [];
    set((state: any) => {
      items = state.cartItems;
      let itemFound = items.findIndex((i: any) => i._id === item._id);
      if (itemFound !== -1) {
        if (items[itemFound].quantity > 1) {
          items[itemFound].quantity -= 1;
          return {
            cartItems: items,
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        } else {
          return {
            cartItems: items.filter((i: any) => i._id !== item._id),
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        }
      } else {
        return state;
      }
    });
    await updateCart(items);
  },
}));
export default zustandStore;
