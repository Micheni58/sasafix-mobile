import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

function resolveApiBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/+$/, "");
  }

  const fromExtra = Constants.expoConfig?.extra?.apiUrl;
  if (fromExtra && String(fromExtra).trim()) {
    return String(fromExtra).trim().replace(/\/+$/, "");
  }

  throw new Error(
    "API base URL is not configured. Set EXPO_PUBLIC_API_URL in your .env file " +
      "(or expo.extra.apiUrl in app.json) and restart Expo with --clear."
  );
}

export const API_BASE_URL = resolveApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const data = err.response?.data;
    let message;

    if (typeof data?.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data?.detail)) {
      message = data.detail
        .map((item) => item?.msg)
        .filter(Boolean)
        .join(", ");
    } else if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data === "string") {
      message = data;
    } else if (err.code === "ECONNABORTED") {
      message = "The request timed out. Please try again.";
    } else if (!err.response) {
      message = "Cannot reach the server. Check your connection and try again.";
    }

    return Promise.reject(new Error(message || err.message || "Something went wrong"));
  }
);

export default apiClient;