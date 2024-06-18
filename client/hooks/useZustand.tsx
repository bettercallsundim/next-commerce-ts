import zustandStore from "../zustand";

export default function useZustand() {
  return zustandStore((state) => state);
}
