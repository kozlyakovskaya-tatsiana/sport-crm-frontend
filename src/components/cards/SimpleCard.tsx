import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export interface SectionCardProps {
  title: string;
  // eslint-disable-next-line no-undef
  image?: JSX.Element;
  onClick?: () => void;
}

export const SimpleCard: React.FC<SectionCardProps> = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "25em",
        height: "15em",
        backgroundColor: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      alignItems="center"
      justifyContent="center"
      onClick={() => props.onClick?.()}
    >
      {props.image}
      <Typography alignItems="center" variant="h5">
        {props.title}
      </Typography>
    </Box>
  );
};
