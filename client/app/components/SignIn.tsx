import { useSignIn } from "@/hooks/queries";
import useZustand from "@/hooks/useZustand";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  const { mutate, data, error } = useSignIn();
  const { user } = useZustand();

  if (user) {
    console.log(user, "from sign up");
  }
  if (error) {
    console.log(error, "from sign up");
  }
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const { email, name, picture }: any = jwtDecode(
          credentialResponse.credential
        );
        if (email) {
          mutate({ email, name, picture });
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default SignIn;
