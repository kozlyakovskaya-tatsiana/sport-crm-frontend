import React from "react";
import { Avatar, Grid, SxProps, Typography, useTheme } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RoundedButton,
  RoundedTextField,
} from "../../styledComponents/styledComponents";
import authService from "../../api/authentication/authService";
import localStorageService from "../../services/localStorageService";
import useAuth from "../../contexts/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = { email: "", password: "" };

const sxInputProps: SxProps = {
  margin: "1%",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Incorrect format of email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 symbols"),
});
const LoginForm: React.FC<{ onSuccessSubmit?: () => void }> = (props) => {
  const theme = useTheme();
  const { refreshAuthInfo } = useAuth();
  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values: LoginFormValues) => {
      authService.signIn(values.email, values.password).then((response) => {
        const result = response.data;
        localStorageService.setAccessToken(result.accessToken);
        localStorageService.setRefreshToken(result.refreshToken);
        refreshAuthInfo();
        props.onSuccessSubmit?.();
      });
    },
    validateOnBlur: true,
    validateOnChange: false,
  });
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item md={2} xs={1} />
      <Grid item md={1} xs={1}>
        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
          <LockRoundedIcon fontSize="large" />
        </Avatar>
      </Grid>
      <Grid item md={1} xs={1}>
        <Typography variant="h4">Sign In</Typography>
      </Grid>
      <Grid item md={5} xs={5}>
        <form onSubmit={formik.handleSubmit}>
          <RoundedTextField
            fullWidth
            label="Email"
            variant="outlined"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            sx={sxInputProps}
          />
          <RoundedTextField
            type="password"
            fullWidth
            label="Password"
            variant="outlined"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            sx={sxInputProps}
          />
          <RoundedButton
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={sxInputProps}
          >
            Sign In
          </RoundedButton>
        </form>
      </Grid>
      <Grid item md={3} xs={4} />
    </Grid>
  );
};

export default LoginForm;
