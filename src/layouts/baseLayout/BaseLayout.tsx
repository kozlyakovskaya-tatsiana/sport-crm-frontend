import React from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import { SectionCardProps } from "../../components/cards/SimpleCard";
import {
  ACTIVITIES_ROUTE,
  GROUPS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SPORT_PLAYGROUNDS_ROUTE,
  TENANTS_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from "../../consts/routes";
import authService from "../../api/authentication/authService";
import { useAuth } from "../../contexts/AuthContext";

const drawerWidth = 260;
export const BaseLayout: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { refreshAuthInfo } = useAuth();
  const baseSxPropsForIcons: SxProps = {
    color: theme.palette.primary.main,
    fontSize: "2em",
  };

  const sectionCards: SectionCardProps[] = [
    {
      title: "Home",
      image: <HomeIcon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(HOME_ROUTE),
    },
    {
      title: "Schedule",
      image: <TodayIcon sx={baseSxPropsForIcons} />,
    },
    {
      title: "Groups",
      image: <Diversity3Icon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(GROUPS_ROUTE),
    },
    {
      title: "Activities",
      image: <SportsVolleyballIcon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(ACTIVITIES_ROUTE),
    },
    {
      title: "Reports",
      image: <AssessmentIcon sx={baseSxPropsForIcons} />,
    },
    {
      title: "Staff",
      image: <PeopleIcon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(USERS_MANAGEMENT_ROUTE),
    },
    {
      title: "Playgrounds",
      image: <MapIcon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(SPORT_PLAYGROUNDS_ROUTE),
    },
    {
      title: "Tenants",
      image: <BusinessIcon sx={baseSxPropsForIcons} />,
      onClick: () => navigate(TENANTS_ROUTE),
    },
  ];

  const menuList = () => (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {sectionCards.map((section) => (
          <ListItem
            key={section.title}
            disablePadding
            onClick={section.onClick}
          >
            <ListItemButton>
              <ListItemIcon>{section.image}</ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.common.white,
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            SelfFit
          </Typography>
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            justifyContent: "center",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{menuList()}</Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
