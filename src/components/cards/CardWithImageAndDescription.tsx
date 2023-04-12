import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";

export interface CardWithImageAndDescriptionProps {
  title: string;
  imgSrc: string;
  description: string;
  leftButtonText: string;
  rightButtonText: string;
}

export const CardWithImageAndDescription: React.FC<
  CardWithImageAndDescriptionProps
> = (props) => {
  console.log(props);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.imgSrc}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{props.leftButtonText}</Button>
        <Button size="small">{props.rightButtonText}</Button>
      </CardActions>
    </Card>
  );
};
