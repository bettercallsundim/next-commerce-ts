"use client";
import { myAxios, useSignOut } from "@/hooks/queries";
import useZustand from "@/hooks/useZustand";
import { googleLogout } from "@react-oauth/google";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const UserContext = ({ children }: Props) => {
  const { setUser, setCart } = useZustand();
  const { signOut, data, error } = useSignOut();
  async function authPersist() {
    try {
      const res = await myAxios.get("/user/authPersist", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        console.log(res.data.user.cart, "cart");
        setCart(res.data.user.cart);
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      setUser(null);
      signOut();
      googleLogout();
    }
  }
  useEffect(() => {
    authPersist();
  }, []);
  return children;
};

export default UserContext;
