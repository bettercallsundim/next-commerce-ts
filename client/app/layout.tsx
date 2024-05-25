import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import GoogleProvider from "./components/GoogleProvider";
import MUI_Wrapper from "./components/MUI_Wrapper";
import Navbar from "./components/Navbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ExoCommerce",
  description: "Ecommerce Province",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root" className={`${poppins.className} poppins`}>
        <MUI_Wrapper>
          <GoogleProvider>
            <Navbar />
            {children}
          </GoogleProvider>
        </MUI_Wrapper>
      </body>
    </html>
  );
}
