"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints";
import { Poppins } from "next/font/google";
import { ReactNode, memo } from "react";
import toast, { Toaster } from "react-hot-toast";

// Extend the default Breakpoints interface to include '2xl'
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
  }
}
const cache = createCache({
  key: "css",
  prepend: true,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});
const MUI_Wrapper = memo(function MUI_Wrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CacheProvider value={cache}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster position="top-right" />

            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </CacheProvider>
  );
});

export default MUI_Wrapper;
