'use client'
import { LOGIN_URL, PROFILE_URL } from "@/config/url.js";
import React, { useContext, useState } from "react";
import useAPI from "@/hooks/useAPI";
import { useRouter } from "next/navigation.js";
import moment from "moment";
  
const saveToken = (token, time = null) => {
  if(token === undefined || token === null){
    localStorage.removeItem('token');
    localStorage.removeItem('life_token');
  } else {
    if(time === null) {
      console.log('life_token is undefined');
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('life_token', time);
  }
}
const getToken = () => ({
  token: localStorage.getItem('token'), 
  life: localStorage.getItem('life_token') 
    ? moment(localStorage.getItem('life_token'))
    : null
});

const AuthContext = React.createContext({
  isLogged: false,
  token: null,
  profile: null,
  setIsLogged: () => {},
  setToken: () => {},
  setProfile: () => {}, 
});

export const useAuth = () => {
  const {
    setIsLogged,
    setToken,
    setProfile
  } = useContext(AuthContext);

  // hooks
  const { post, get } = useAPI();
  const router = useRouter();

  const login = async ({
    email,
    password
  }) => {
    const response = await post(LOGIN_URL, {
      email,
      password
    });

    if (response?.data) {
      setIsLogged(response.data.isLogged);
      setToken(response.data.token);
      saveToken(response.data.token, response.data.life_token);
    }
  };

  const fetchProfile = async () => {
    try{
      const response = await get(PROFILE_URL);
      if (response?.data) {
        setProfile(response.data);
        return true;
      }
      return false;
    }catch(error){
      console.log('error: ', error);
      return false;
    }
  };

  const verifyToken = () => {
    const {token, life} = getToken();
    if (token) {
      if(moment().isAfter(life)){
        setIsLogged(false);
        setToken(null);
        saveToken(undefined);
        router.push('/login');
        return;
      }else{
        setIsLogged(true);
        setToken(token);
      }      
    }else{
      setIsLogged(false);
      setToken(null);
      saveToken(undefined);
      router.push('/login');
    }
  };

  const logout = () => {
    setIsLogged(false);
  };

  return {
    login,
    logout,
    verifyToken,
    fetchProfile
  };
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  
  return <AuthContext.Provider value={{
    isLogged,
    token,
    profile,
    setIsLogged,
    setToken,
    setProfile
  }}>{children}</AuthContext.Provider>;
}

export default AuthContext;