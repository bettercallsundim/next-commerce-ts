import { create } from "zustand";

interface ZustandStates {
  cartItemsNumber: number;
  cartItems: any;
  user: any;
  setUser: (user: any) => void;
  addToCart: (item: any) => void;
  decreaseFromCart: (item: any) => void;
}

const zustandStore = create<ZustandStates>((set) => ({
  cartItemsNumber: 0,
  cartItems: [],
  user: null,
  setUser: (user: any) => set({ user }),
  addToCart: (item: any) =>
    set((state: any) => {
      let items = state.cartItems;
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
    }),
  decreaseFromCart: (item: any) =>
    set((state: any) => {
      let items = state.cartItems;
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
    }),
}));
export default zustandStore;
