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
import { Poppins } from "next/font/google";
import { ReactNode, memo } from "react";
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
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </CacheProvider>
  );
});

export default MUI_Wrapper;
