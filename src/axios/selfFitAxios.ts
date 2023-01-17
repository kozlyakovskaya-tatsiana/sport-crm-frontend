import axios from "axios";
import localStorageService from "../services/localStorageService";

const selfFitAxios = axios.create({
  baseURL: process.env.REACT_APP_SELF_FIT_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

selfFitAxios.interceptors.request.use((config) => {
  const accessToken = localStorageService.getAccessToken();
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

export default selfFitAxios;
