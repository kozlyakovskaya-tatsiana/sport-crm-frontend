import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";

export const NoDataToDisplay: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item md={12} alignSelf="center">
          <Typography align="center" variant="h5">
            No data to display
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
