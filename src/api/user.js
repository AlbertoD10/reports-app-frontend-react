import { basePath, apiVersion } from "./config";

export async function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export async function loginApi(data) {
  const url = `${basePath}/${apiVersion}/login`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
