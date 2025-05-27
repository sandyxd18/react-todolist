import { getToken } from "./token";

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const API_BASE_URL = "https://backend-service.backend.svc.cluster.local"; // Replace with your actual API base URL

export const request = async (URL, method = "GET", data = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    const cleanToken = token
      .toString()
      .replace(/[\s\r\n]+/g, "") 
      .replace(/[^A-Za-z0-9\-._~+/]+=*/g, ""); 

    if (cleanToken) {
      headers["Authorization"] = `Bearer ${cleanToken}`;
    }
  }

  const options = {
    method,
    headers,
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${URL}`, options);

    const contentType = res.headers.get("content-type") || "";

    let json = null;
    if (contentType.includes("application/json")) {
      json = await res.json();
    } else {
      json = { msg: await res.text() };
    }

    return {
      status: res.ok,
      message: json.msg || (res.ok ? "Success" : "Failed"),
      data: json,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Network error",
      data: null,
    };
  }
};
