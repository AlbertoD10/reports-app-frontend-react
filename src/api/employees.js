import { basePath, apiVersion } from "./config";

export async function addEmployeeApi(token, data) {
  const url = `${basePath}/${apiVersion}/add-employee`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export async function getAllEmployeesApi(token) {
  const url = `${basePath}/${apiVersion}/get-all`;
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
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

export async function getEmployeeApi(token, id) {
  const url = `${basePath}/${apiVersion}/get-employee/${id}`;
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
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

export async function addExpenseApi(token, data, id) {
  const url = `${basePath}/${apiVersion}/add-expense/${id}`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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
