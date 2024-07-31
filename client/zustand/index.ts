import { myAxios } from "@/hooks/queries";
import mongoose from "mongoose";
import { create } from "zustand";
import { CartItem } from "./../../server/src/types/index";
interface ZustandStates {
  cartItemsNumber: number;
  cartItems: CartItem[];
  checkoutItems: CartItem[];
  user: any;
  setUser: (user: any) => void;
  addToCart: (item: any) => void;
  decreaseFromCart: (item: any) => void;
  setCheckoutItems: (items:CartItem[]) => void;
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
    .then((res) => {});
}

const zustandStore = create<ZustandStates>((set) => ({
  user: null,
  cartItemsNumber: 0,
  cartItems: [],
  checkoutItems: [],

  setUser: (user: any) => set({ user }),
  setCart: (cartItems: CartItem[]) => set({ cartItems }),
  addToCart: async (item: any) => {
    let items: CartItem[] | [] = [];
    set((state: any) => {
      items = state.cartItems;
      let itemFound = items.findIndex(
        (i: any) => i?.product?._id === item?._id
      );
      if (itemFound !== -1) {
        items[itemFound].quantity += 1;
        return { cartItems: items, cartItemsNumber: state.cartItemsNumber + 1 };
      } else {
        return {
          cartItems: [...items, { product: { ...item }, quantity: 1 }],
          cartItemsNumber: state.cartItemsNumber + 1,
        };
      }
    });
    let filteredItems = items.map((item) => ({
      quantity: item.quantity,
      product: new mongoose.Types.ObjectId(item?.product?._id),
    }));
    await updateCart(filteredItems);
  },
  decreaseFromCart: async (item: any) => {
    let items: CartItem[] | [] = [];
    set((state: any) => {
      items = state.cartItems;

      let itemFound = items.findIndex(
        (i: any) => i?.product?._id === item?._id
      );
      if (itemFound !== -1) {
        if (items[itemFound].quantity > 1) {
          items[itemFound].quantity -= 1;
          return {
            cartItems: items,
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        } else {
          return {
            cartItems: items.filter((i: any) => i?.product?._id !== item?._id),
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        }
      } else {
        return state;
      }
    });
    let filteredItems = items.map((item) => ({
      quantity: item.quantity,
      product: new mongoose.Types.ObjectId(item?.product?._id),
    }));
    await updateCart(filteredItems);
  },
  setCheckoutItems: (checkoutItems: CartItem[]) => set({ checkoutItems }),
}));
export default zustandStore;
