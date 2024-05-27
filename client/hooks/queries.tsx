import { SignUp } from "@/types";
import useStore from "@/zustand";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND;

export const useSignIn = () => {
  const { setUser } = useStore();
  const { mutate, isPending, data, error, isError, isSuccess } = useMutation({
    mutationFn: async (input: SignUp) => {

        const res=await axios.post("/user/sign-in", input, {
          withCredentials: true,
        })
        if (!res.data.success){
          throw new Error("huh")
        }
        return res.data

    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
  return { mutate, data, isPending, error };
};

export const useSignOut = () => {
  const { mutate, error, data } = useMutation(
   {
     mutationFn:async () => {
      const response = await axios.get('/user/sign-out', {
        withCredentials: true,
      });
      return response.data;
    }
   }
  );

  return { signOut: mutate, error, data };
};


export { axios };
