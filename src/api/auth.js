import { DateTime } from "luxon";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { basePath, apiVersion } from "./config";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  //If i have no token, then return null
  if (!accessToken || accessToken === null) {
    return null;
  }

  //If token is expired return null else return the token
  if (isTokenExpired(accessToken)) {
    return null;
  } else return accessToken;
}

export function isTokenExpired(token) {
  const tokenDecoded = jwtDecode(token);
  const { exp } = tokenDecoded;
  const currentTime = DateTime.now().toSeconds();

  //iat is the actual time and exp is the expiration date
  if (currentTime > exp) {
    return true;
  }
  return false;
}

//Funcion para obtener el refreshToken
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === null) {
    return null;
  }
  return isTokenExpired(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = { refreshToken: refreshToken };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then(response => {
      if (!response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(result => {
      if (!result) {
        logout();
      } else {
        const { refreshToken, accesToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accesToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem("employee_id");
}
