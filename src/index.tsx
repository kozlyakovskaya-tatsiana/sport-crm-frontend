import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import { AuthenticationProvider } from "./contexts/AuthContext";
import App from "./App";
import { WithAxios } from "./axios/AxiosInterceptor";
import { NotificationToastProvider } from "./contexts/NotificationToastContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <NotificationToastProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AuthenticationProvider>
              <WithAxios>
                <App />
              </WithAxios>
            </AuthenticationProvider>
          </BrowserRouter>
        </ThemeProvider>
      </NotificationToastProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
