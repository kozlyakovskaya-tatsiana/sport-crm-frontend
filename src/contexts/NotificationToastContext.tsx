import { toast, ToastContainer, ToastOptions } from "react-toastify";
import React, { useContext } from "react";

interface NotificationToastContextType {
  notify(
    message: string,
    type?: "info" | "success" | "warning" | "error" | "default",
    options?: ToastOptions
  ): void;
  somethingWentWrongNotify(): void;
}

const NotificationToastContext =
  React.createContext<NotificationToastContextType>(
    {} as NotificationToastContextType
  );

export const NotificationToastProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  function showNotification(
    message: string,
    type?: "info" | "success" | "warning" | "error" | "default",
    options?: ToastOptions
  ) {
    switch (type) {
      case "info":
        toast.info(message, options);
        return;
      case "success":
        toast.success(message, options);
        return;
      case "warning":
        toast.warning(message, options);
        return;
      case "error":
        toast.error(message, options);
        return;
      case "default":
      default:
        toast(message);
    }
  }
  function showSomethingWentWrongNotify() {
    toast.error("Something went wrong. Please contact System Administrator.", {
      position: "top-right",
      theme: "colored",
    });
  }

  return (
    <NotificationToastContext.Provider
      value={{
        notify: showNotification,
        somethingWentWrongNotify: showSomethingWentWrongNotify,
      }}
    >
      {props.children}
      <ToastContainer />
    </NotificationToastContext.Provider>
  );
};

export function useToastNotify() {
  return useContext(NotificationToastContext);
}
