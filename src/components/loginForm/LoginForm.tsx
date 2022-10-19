import React from "react";
import { Avatar, Grid, TextField, Typography, useTheme } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

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
      <Grid item md={1}>
        <TextField label="Email" variant="outlined" />
      </Grid>
      <Grid item md={1}>
        <TextField label="Password" variant="outlined" />
      </Grid>
      <Grid item md={6} />
    </Grid>
  );
};
