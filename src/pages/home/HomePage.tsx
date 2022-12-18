import React from "react";
import { Grid, SxProps, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import PaymentIcon from "@mui/icons-material/Payment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  SectionCard,
  SectionCardProps,
} from "../../components/sectionCard/SectionCard";
import { USERS_MANAGEMENT_ROUTE } from "../../consts/routes";

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
      title: "Companies",
      image: <Diversity3Icon sx={baseSxPropsForIcons} />,
    },
    {
      title: "Activities",
      image: <SportsVolleyballIcon sx={baseSxPropsForIcons} />,
    },
    {
      title: "Prices",
      image: <PaymentIcon sx={baseSxPropsForIcons} />,
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
      title: "Gyms",
      image: <MapIcon sx={baseSxPropsForIcons} />,
    },
  ];
  return (
    <Grid
      container
      spacing={3}
      sx={{ paddingRight: "5%", paddingLeft: "5%", paddingTop: "5%" }}
    >
      {sectionCards.map((card) => (
        <Grid item md={3} key={generateUniqueID()}>
          <SectionCard
            title={card?.title}
            image={card?.image}
            onClick={card.onClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};
