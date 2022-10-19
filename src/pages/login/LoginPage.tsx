import React from "react";
import { Grid, Typography } from "@mui/material";
import styles from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid
        container
        item
        xs={7}
        className={styles.leftSide}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
      >
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Typography variant={"h1"} color={"white"}>
            Tracking system
          </Typography>
          <Typography variant={"h4"} color={"white"}>
            You can sign in to access with your existing account.
          </Typography>
        </Grid>
        <Grid item xs={4} />
      </Grid>
      <Grid item xs={5}>
        Form here
      </Grid>
    </Grid>
  );
};
