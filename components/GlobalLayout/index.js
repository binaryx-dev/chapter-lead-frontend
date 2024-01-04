'use client'
import React, { useEffect, useState } from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@app/globals.css';
import { alpha, createTheme, lighten, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "@/contexts/AuthContext.js";
import BaseLayout from "../BaseLayout/index.js";
import { usePathname, useRouter } from "next/navigation.js";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
      contrastText: grey[900],
    },
    secondary:{
      main: grey[900],
      contrastText: "#fff",
    },
    success: {
      main: lighten('#4caf50', .1),
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 28,
  },
  components:{
    MuiButton:{
      defaultProps:{
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides:{
        root:{
          textTransform: "capitalize",
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          paddingLeft: 12,
          '&.Mui-focused':{
            left: 2
          }
        }
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root:{
          '& fieldset legend':{
            marginLeft: 10
          }
        }
      }
    }
  }
});

const GlobalLayout = ({ children, variant }) => { 
  const pathname = usePathname();
  const { verifyToken } = useAuth();

  useEffect(() => {
    if (pathname !== '/login'){
      verifyToken();
    }
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default GlobalLayout;