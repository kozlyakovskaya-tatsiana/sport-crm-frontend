import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import styles from "./LoginPage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";
import { HOME_ROUTE } from "../../consts/routes";
import { useToastNotify } from "../../contexts/NotificationToastContext";

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { notify, somethingWentWrongNotify } = useToastNotify();

  const onLoginError = (error: AxiosError) => {
    if (error && error.response) {
      if (error.response.status === 400) {
        notify("Email or password is incorrect.", "error", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 3000,
          closeOnClick: true,
          toastId: "incorrect-login-data",
        });
      } else {
        somethingWentWrongNotify();
      }
    }
  };

  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        container
        item
        xs={12}
        md={7}
        alignItems="center"
        justifyContent="center"
        direction="column"
        className={styles.leftSide}
      >
        <Grid item xs={3} md={4} />
        <Grid item xs={6} md={4}>
          <Typography variant="h1" color={theme.palette.common.white}>
            Tracking system
          </Typography>
          <Typography variant="h4" color={theme.palette.common.white}>
            You can sign in to access with your existing account.
          </Typography>
        </Grid>
        <Grid item md={4} xs={3} />
      </Grid>
      <Grid container item xs={12} md={5} direction="row">
        <LoginForm
          onSuccessLogin={() => navigate(HOME_ROUTE)}
          onFailLogin={onLoginError}
        />
      </Grid>
    </Grid>
  );
};
export default LoginPage;
