"use client";
import useZustand from "@/hooks/useZustand";
import { SignUp } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND;

export const useSignIn = () => {
  const { setUser } = useZustand();
  const { mutate, isPending, data, error, isError, isSuccess } = useMutation({
    mutationFn: async (input: SignUp) => {
      const res = await axios.post("/user/sign-in", input, {
        withCredentials: true,
      });
      if (!res.data.success) {
        throw new Error("Error Occured");
      }
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
  return { mutate, data, isPending, error };
};

export const useSignOut = () => {
  const { mutate, error, data } = useMutation({
    mutationFn: async () => {
      const response = await axios.get("/user/sign-out", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return { signOut: mutate, error, data };
};

export const useGetCategoriesTree = () => {
  const { error, data, isPending } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: async () => {
      const response = await axios.get("/category/all/tree", {
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error("Error Occured");
      }
      return response.data;
    },
  });

  return { error, data, isPending };
};

export const useCreateProduct = () => {
  const {
    mutate: createProduct,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (productData: {
      name: string;
      description: string;
      price: number;
      category: string;
      stock: number;
      colors: { name: string; code: string }[];
      sizes: string[];
      pictures: any[];
    }) => {
      let res = await axios.post("/product/create", productData, {
        withCredentials: true,
      });
      console.log(res, "resss");
      return res;
    },
    onSuccess: (data) => {
      console.log(data, "createProduct data");
    },
  });
  return { createProduct, isPending, error };
};

export { axios as myAxios };
