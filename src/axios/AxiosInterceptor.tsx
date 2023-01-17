import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorageService";
import authService from "../api/authentication/authService";
import { useAuth } from "../contexts/AuthContext";
import selfFitAxios from "./selfFitAxios";
import { LOGIN_ROUTE } from "../consts/routes";
import { useToastNotify } from "../contexts/NotificationToastContext";

// eslint-disable-next-line no-undef
export const WithAxios: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { refreshAuthInfo } = useAuth();
  const { notify } = useToastNotify();
  const navigate = useNavigate();

  async function handleRefreshTokens() {
    try {
      const response = await authService.refreshTokens(
        localStorageService.getAccessToken(),
        localStorageService.getRefreshToken()
      );
      const newTokensPair = response.data;
      localStorageService.setAccessToken(newTokensPair.accessToken);
      localStorageService.setRefreshToken(newTokensPair.refreshToken);
    } catch (e) {
      authService.signOut();
      navigate(LOGIN_ROUTE);
    } finally {
      refreshAuthInfo();
    }
  }
  useEffect(() => {
    selfFitAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequestConfig = error.config;
        if (error.response) {
          // eslint-disable-next-line no-underscore-dangle
          if (error.response.status === 401 && !originalRequestConfig._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequestConfig._retry = true;
            await handleRefreshTokens();
            return axios(originalRequestConfig);
          }
          if (error.response.status === 401) {
            navigate(LOGIN_ROUTE);
          }
        } else {
          notify("Network error.", "error", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: 4000,
            toastId: "network-error",
            closeOnClick: true,
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return children;
};
