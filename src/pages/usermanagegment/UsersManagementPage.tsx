import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  UserCard,
  UserCardProps,
} from "../../components/usersmanagement/UserCard/UserCard";

export const UsersManagementPage: React.FC = (props) => {
  const users: { name: string }[] = [
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
        sx={{
          paddingRight: "3%",
          paddingLeft: "3%",
          paddingTop: "5%",
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          {users?.map((user) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </>
                  }
                />
              </ListItem>
            </List>
          ))}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
};
