import React, { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  logout,
  refreshAccessTokenApi,
} from "../api/auth";

//Context to verify if the user is logged
export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props; //The whole app
  const [user, setUser] = useState({ user: null, isLoading: true });

  //Verify if the user is logeed on each render
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

//Verify if the user is logged
function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({ user: null, isLoading: false });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
