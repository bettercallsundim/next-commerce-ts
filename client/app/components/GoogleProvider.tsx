"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const GoogleProvider = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLICI_GOOGLE_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
