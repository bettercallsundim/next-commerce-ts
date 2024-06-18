"use client";
import { axios, useSignOut } from "@/hooks/queries";
import useZustand from "@/hooks/useZustand";
import { googleLogout } from "@react-oauth/google";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const UserContext = ({ children }: Props) => {
  const { setUser } = useZustand();
  const { signOut, data, error } = useSignOut();
  async function authPersist() {
    try {
      const res = await axios.get("/user/authPersist", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
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
