import React, { createContext, useContext } from "react";
import authService from "../api/authentication/authService";
import { UserRole } from "../consts/roles";

interface AuthContextType {
  isAuthenticated: boolean;
  roles: string[];
  isAdmin: boolean;
  isInstructor: boolean;
  refreshAuthInfo: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    authService.isAuthenticated()
  );
  const [roles, setRoles] = React.useState<string[]>([]);

  React.useEffect(() => {
    handleUserDataFromAccessToken();
  }, []);

  function handleUserDataFromAccessToken() {
    setIsAuthenticated(authService.isAuthenticated());
    setRoles(authService.getUserRoles());
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        isAdmin: roles.includes(UserRole.Administrator),
        isInstructor: roles.includes(UserRole.Instructor),
        refreshAuthInfo: handleUserDataFromAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
