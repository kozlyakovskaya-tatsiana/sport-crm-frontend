import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import NoImage from "../../images/undefinedUser.png";

export const SportPlayGroundCard: React.FC = () => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia sx={{ height: 140 }} image={NoImage} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Sport Gym 1
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Delete</Button>
      <Button size="small">More info</Button>
    </CardActions>
  </Card>
);
