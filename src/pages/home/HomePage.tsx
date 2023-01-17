import React from "react";
import { Grid, SxProps, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import MapIcon from "@mui/icons-material/Map";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useNavigate } from "react-router-dom";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  SectionCard,
  SectionCardProps,
} from "../../components/sectionCard/SectionCard";
import {
  ACTIVITIES_ROUTE,
  GROUPS_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from "../../consts/routes";

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const baseSxPropsForIcons: SxProps = {
    color: theme.palette.primary.main,
    fontSize: "4em",
  };
  const sectionCards: SectionCardProps[] = [
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
    },
  ];

  return (
    <>
      <Grid container spacing={3} sx={{ paddingTop: "10%" }}>
        {sectionCards.map((card) => (
          <Grid
            item
            md={4}
            xs={4}
            xl={4}
            lg={4}
            key={generateUniqueID()}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <SectionCard
              title={card?.title}
              image={card?.image}
              onClick={card.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
