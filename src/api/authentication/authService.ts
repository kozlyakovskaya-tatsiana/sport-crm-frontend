import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import baseSelfFitAxios from "../../axios/baseSelfFitAxios";
import { RefreshTokensResponse } from "./responses/RefreshTokensResponse";
import { SignInUserResult } from "./responses/SignInUserResult";
import { SIGN_IN_API } from "../constants/endpoints";
import localStorageService from "../../services/localStorageService";

async function signIn(
  email: string,
  password: string
): Promise<AxiosResponse<SignInUserResult>> {
  return baseSelfFitAxios.post<SignInUserResult>(SIGN_IN_API, {
    email,
    password,
  });
}
async function refreshTokens(
  accessToken: string,
  refreshToken: string
): Promise<AxiosResponse<RefreshTokensResponse>> {
  return baseSelfFitAxios.post<RefreshTokensResponse>(
    "Authentication/refresh",
    {
      accessToken,
      refreshToken,
    }
  );
}
function signOut() {
  localStorageService.clearTokens();
}
function isAuthenticated(): boolean {
  return !!localStorageService.getAccessToken();
}
function getUserRoles(): string[] {
  if (localStorageService.getAccessToken()) {
    const decodedToken = jwtDecode(localStorageService.getAccessToken()) as {
      role: string;
    };
    return decodedToken?.role?.split(";");
  }

  return [];
}

const authService = {
  refreshTokens,
  signIn,
  signOut,
  getUserRoles,
  isAuthenticated,
};

export default authService;
