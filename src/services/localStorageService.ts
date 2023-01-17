const ACCESS_TOKEN_NAME = "access_token";
const REFRESH_TOKEN_NAME = "refresh_token";

function setAccessToken(accessToken: string) {
  return localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
}
function setRefreshToken(refreshToken: string) {
  return localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
}
function getAccessToken(): string {
  return localStorage.getItem(ACCESS_TOKEN_NAME) ?? "";
}
function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_TOKEN_NAME) ?? "";
}
function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
  localStorage.removeItem(REFRESH_TOKEN_NAME);
}
const LocalStorageService = {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearTokens,
};
export default LocalStorageService;
