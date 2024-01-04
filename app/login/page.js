'use client'
import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import AuthContext, { useAuth } from '@/contexts/AuthContext.js';
import { useRouter } from 'next/navigation.js';
import showAlert from '@/functions/showAlert.js';
import { COLOR_BACKGROUND } from '@/config/colors.js';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: COLOR_BACKGROUND,
}));

const LoginCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%',
  },
  width: '90%',
  padding: '20px',
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: 'center',
  marginBottom: '30px',
}));

const LoginButton = styled(Button)(({ theme }) => ({
  display: 'block',
  maxWidth: '60%',
  margin: 'auto',
  marginTop: '30px',
  paddingTop: '12px',
  paddingBottom: '12px',
  fontSize: '1.1rem',
}));

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { isLogged } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const singIn = () => {
    if(!email || !password){
      showAlert({
        text: 'Debe ingresar su correo electrónico y contraseña',
        icon: 'warning'
      });
      return;
    }
    login({ email, password });
  }

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged]);

  return (
    <Container>
      <LoginCard>
        <CardContent>
          <LoginTitle>Iniciar Sesión</LoginTitle>
          <form noValidate autoComplete="off">
            <TextField
              id="email-login"
              label="Correo Electrónico"
              placeholder='Ingrese su correo electrónico...'
              type="email"
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth />
            <TextField
              id="email-password"
              label="Contraseña"
              type="password"
              placeholder='Ingrese su contraseña...'
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth />
            <LoginButton variant="contained" color="primary" fullWidth onClick={singIn}>
              Iniciar Sesión
            </LoginButton>
          </form>
        </CardContent>
      </LoginCard>
    </Container>
  );
}

export default Login;