'use client'
import { COLOR_BACKGROUND } from "@/config/colors.js";
import AuthContext, { useAuth } from "@/contexts/AuthContext.js";
import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";

const Background = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'start',
  minHeight: '100vh',
  backgroundColor: COLOR_BACKGROUND,
  [theme.breakpoints.up('sm')]:{
    padding: theme.spacing(3) 
  }
}));

const BaseContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1) + " !important",
  height: 'fit-content',  
  [theme.breakpoints.up('sm')]:{
    borderRadius: theme.spacing(8),
  },
  [theme.breakpoints.only('xs')]:{    
    minHeight: '100vh',
  }
}));

const BaseLayout = ({ children }) => {
  const { profile } = useContext(AuthContext);
  const { fetchProfile } = useAuth();

  useEffect(() => {
    if (profile == null || profile == undefined) fetchProfile();
  }, [profile]);

  return (
    <Background>
      <BaseContainer>
        {children}
      </BaseContainer>
    </Background>
  )
}

export default BaseLayout;