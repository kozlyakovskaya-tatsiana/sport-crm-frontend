import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export interface SportPlayGroundCardProps {
  name: string;
  imgSrc: string;
  activitiesCount: number;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
}

export const SportPlayGroundCard: React.FC<SportPlayGroundCardProps> = (
  props
) => (
  <Card sx={{ maxWidth: 360, width: "100%" }}>
    <CardMedia sx={{ height: 160 }} image={props.imgSrc} />
    <CardContent>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        style={{ textAlign: "center" }}
      >
        {props.name}
      </Typography>
      <Typography fontSize={16} component="div">
        Activities: {props.activitiesCount}
      </Typography>
    </CardContent>
    <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        size="medium"
        variant="contained"
        onClick={() => props.onEditButtonClick?.()}
      >
        Edit
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="error"
        onClick={() => props.onDeleteButtonClick?.()}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);
