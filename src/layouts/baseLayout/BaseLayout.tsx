import React from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
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
import {
  NavLink,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import { SectionCardProps } from "../../components/cards/SimpleCard";
import {
  ACTIVITIES_ROUTE,
  GROUPS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SPORT_PLAYGROUNDS_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from "../../consts/routes";
import authService from "../../api/authentication/authService";
import { useAuth } from "../../contexts/AuthContext";

export const BaseLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
  ];

  const menuList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
      onKeyDown={() => setIsDrawerOpen(false)}
    >
      <List>
        {sectionCards.map((section, index) => (
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
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {pathname !== HOME_ROUTE && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setIsDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon
                  sx={{ color: theme.palette.common.white, fontSize: "1.5em" }}
                />
              </IconButton>
            )}
            <NavLink
              to={HOME_ROUTE}
              style={{ flexGrow: 1, textDecoration: "none" }}
            >
              <Typography
                variant="h4"
                sx={{ color: theme.palette.common.white }}
              >
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
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {menuList()}
      </Drawer>
    </>
  );
};
