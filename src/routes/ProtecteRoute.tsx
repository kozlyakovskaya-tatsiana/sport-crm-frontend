import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{
  redirectPath: string;
  isAllowed: boolean;
  // eslint-disable-next-line no-undef
  children: JSX.Element;
}> = (props) => {
  if (!props.isAllowed) {
    return <Navigate to={props.redirectPath} replace />;
  }
  return props.children;
};
