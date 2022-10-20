import React from "react";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import styles from "./LoginForm.module.css";
import {
  RoundedButton,
  RoundedTextField,
} from "../../styledComponents/styledComponents";

export const LoginForm: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Grid item md={2} />
      <Grid item md={1}>
        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
          <LockRoundedIcon fontSize={"large"} />
        </Avatar>
      </Grid>
      <Grid item md={1}>
        <Typography variant={"h4"}>Sign In</Typography>
      </Grid>
      <Grid item md={1} className={styles.inputWrapper}>
        <RoundedTextField fullWidth label="Email" variant="outlined" />
      </Grid>
      <Grid item md={1} className={styles.inputWrapper}>
        <RoundedTextField fullWidth label="Password" variant="outlined" />
      </Grid>
      <Grid item md={1} className={styles.inputWrapper}>
        <RoundedButton
          fullWidth
          variant="contained"
          color="primary"
          size={"large"}
        >
          Sign In
        </RoundedButton>
      </Grid>
      <Grid item md={5} />
    </Grid>
  );
};
