import axios from "axios";
import localStorageService from "../services/localStorageService";

const baseSelfFitAxios = axios.create({
  baseURL: process.env.REACT_APP_SELF_FIT_BACKEND_BASE_URL,
});

baseSelfFitAxios.interceptors.request.use((config) => {
  const accessToken = localStorageService.getAccessToken();
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

export default baseSelfFitAxios;
