import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  UserCard,
  UserCardProps,
} from "../../components/usersmanagement/UserCard/UserCard";

export const UsersManagementPage: React.FC = (props) => {
  const usersCardProps: UserCardProps[] = [
    {
      name: "Alexander Sidorov",
    },
    {
      name: "Ivan Ivanov",
    },
    {
      name: "Evgeniy Zaicev",
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "3%" }}>
        Instructors
      </Typography>
      <Grid
        container
        sx={{
          justifyContent: "space-around",
          paddingRight: "3%",
          paddingLeft: "3%",
        }}
      >
        <Grid item xl={12} xs={12} md={12}>
          <Button
            variant="contained"
            sx={{ minHeight: "50px", minWidth: "160px" }}
          >
            <AddIcon />
            Add new
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "5%",
          justifyContent: "space-around",
        }}
      >
        {usersCardProps.map((cardProps) => (
          <Grid item xs={3}>
            <UserCard
              name={cardProps.name}
              userImageSrc={cardProps.userImageSrc}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
