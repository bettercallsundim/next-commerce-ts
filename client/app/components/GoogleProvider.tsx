"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import UserContext from "./UserContext";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const GoogleProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserContext>{children}</UserContext>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default GoogleProvider;
