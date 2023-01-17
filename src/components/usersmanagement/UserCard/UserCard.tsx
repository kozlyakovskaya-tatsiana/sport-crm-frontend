import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import undefinedUserPng from "../../../images/undefinedUser.png";

export interface UserCardProps {
  name: string;
  userImageSrc?: string;
}
export const UserCard: React.FC<UserCardProps> = (props) => (
  <Card sx={{ maxWidth: 240 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="160"
        image={props.userImageSrc || undefinedUserPng}
        alt="User avatar"
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Button size="medium">Edit</Button>
      <Button size="medium" color="error">
        Delete
      </Button>
    </CardActions>
  </Card>
);
