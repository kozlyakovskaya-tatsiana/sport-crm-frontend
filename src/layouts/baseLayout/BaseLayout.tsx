import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink, Outlet, redirect } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import authService from "../../api/authentication/authService";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../consts/routes";

export const BaseLayout: React.FC = () => {
  const theme = useTheme();
  const { refreshAuthInfo } = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to={HOME_ROUTE}
            style={{ flexGrow: 1, textDecoration: "none" }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
              SelfFit
            </Typography>
          </NavLink>
          <Button
            sx={{ color: theme.palette.common.white }}
            onClick={() => {
              authService.signOut();
              refreshAuthInfo();
              redirect(LOGIN_ROUTE);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
