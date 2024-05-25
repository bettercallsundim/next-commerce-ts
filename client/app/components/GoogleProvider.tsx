"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const GoogleProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default GoogleProvider;
