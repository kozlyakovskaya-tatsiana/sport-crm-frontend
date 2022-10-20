import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import styles from "./LoginPage.module.css";
import { LoginForm } from "../../components/loginForm/LoginForm";

const LoginPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={0}>
      <Grid
        container
        item
        xs={7}
        md={7}
        className={styles.leftSide}
        alignItems="center"
        justifyContent="center"
        direction="column"
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
      <Grid container item xs={5} md={5} direction="row">
        <LoginForm />
      </Grid>
    </Grid>
  );
};
export default LoginPage;
