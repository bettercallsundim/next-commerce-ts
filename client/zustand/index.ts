import { create } from "zustand";
const useStore = create((set) => ({
  cartItemsNumber: 0,
  cartItems: [],
  addToCart: (item: any) =>
    set((state: any) => {
      let items = state.cartItems;
      let itemFound = items.findIndex((i: any) => i.id === item.id);
      console.log(item, itemFound, items);
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
      let itemFound = items.findIndex((i: any) => i.id === item.id);
      console.log(item, itemFound, items);
      if (itemFound !== -1) {
        if (items[itemFound].quantity > 1) {
          items[itemFound].quantity -= 1;
          return {
            cartItems: items,
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        } else {
          return {
            cartItems: items.filter((i: any) => i.id !== item.id),
            cartItemsNumber: state.cartItemsNumber - 1,
          };
        }
      } else {
        return state;
      }
    }),
}));
export default useStore;
