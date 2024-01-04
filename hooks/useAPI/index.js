'use client'
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment.js';
import showAlertBase from '@/functions/showAlert.js';
import { LOGIN_URL } from '@/config/url.js';
import { useRouter } from 'next/navigation.js';

const showAlert = (message, code = 400, isWarning) => showAlertBase({
  title: 'Error en la Solicitud',
  text: `${message}. ${code > 0 && `[ERR: ${code}]`}`,
  icon: isWarning ? 'warning' : 'error',
  confirmButtonText: 'Aceptar'
});

const useAPI = () => {
  const router = useRouter();
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const token = () => {
    if(typeof window === 'undefined') return null;
    return localStorage.getItem('token') ?? null;
  }

  const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: moment.duration(process.env.API_TIMEOUT, 'seconds').asMilliseconds(),
    headers: {
      'X-Custom-Header': 'foobar',
      Authorization: `Bearer ${token()}`,
    }
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Genera los if necesarios para manejar los errores Http mas comunes
      if (error.response) {
        let message = error.response.data.message;
        switch (error.response.status) {
          case 400:
            console.error('Error 400: Bad Request');
            showAlert(message ?? 'Se ha encontrado un error en su solicitud, intente nuevamente mas tarde', 400);
            break;
          case 401:
            console.error('Error 401: Unauthorized');
            if(error.response.request.responseURL.includes(LOGIN_URL))
              showAlert(message ?? 'Correo electrónico o contraseña inválidos, intente nuevamente', 0);
            else
              showAlert('No se ha podido autenticar su solicitud, inicie session e intente nuevamente mas tarde', 401)
                .then(() => router.push('/login'));
            break;
          case 403:
            console.error('Error 403: Forbidden');
            showAlert('No tiene permisos para realizar esta solicitud', 403);
            break;
          case 404:
            console.error('Error 404: Not Found');
            showAlert(message ?? 'No se ha encontrado el recurso solicitado', 404, true);
            break;
          case 500:
            console.error('Error 500: Internal Server Error');
            showAlert('Se ha encontrado un error en el servidor, comuníquese con el area de soporte', 500);
            break;
          case 503:
            console.error('Error 503: Service Unavailable');
            showAlert('El servicio no esta disponible, intente nuevamente mas tarde', 503);
            break;
          default:
            console.error('Error: ', error.response.status);
            break;
        }
      } else if (error.request) {
        console.error('Error: ', error.request);
      } else {
        console.error('Error: ', error.message);
      }
      console.error(error.config);
      return Promise.reject(error);
    }
  );

  const get = async (url, params = '') => {
    setState({ loading: true });
    try {
      const response = await instance.get("/api"+url+params);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      setState({error, loading: false });
      return error;
    }
  }

  const post = async (url, data = {}) => {
    setState({ loading: true });
    try {
      const response = await instance.post("/api"+url, data);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      setState({error, loading: false });
      return error;
    }
  }

  const put = async (url, data = {}) => {
    setState({ loading: true });
    try {
      const response = await instance.put("/api"+url, data);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      setState({error, loading: false });
      return error;
    }
  }

  const patch = async (url, data = {}) => {
    setState({ loading: true });
    try {
      const response = await instance.patch("/api"+url, data);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      setState({error, loading: false });
      return error;
    }
  }

  return {
    get,
    post,
    put,
    patch
  };
}

export default useAPI;