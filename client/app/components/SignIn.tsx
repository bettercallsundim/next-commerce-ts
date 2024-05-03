import { GoogleLogin } from "@react-oauth/google";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default SignIn;
