import {
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { AxiosError } from "axios";
import { Currency } from "../../Currency";
import { ActivityForm } from "../../components/activityForm/ActivityForm";
import { useToastNotify } from "../../contexts/NotificationToastContext";
import { ActivitiesTable } from "../../components/activitiesTable/ActivitiesTable";
import { Activity } from "../../models/Activity";

export const ActivitiesPage: React.FC = (props) => {
  const [activities, setActivities] = React.useState<Activity[]>([
    { Name: "Volleyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "Volleyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "Volleyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "BAsketeyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "Volrgyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "rggreleyball", CostPerHour: 32, GroupsCount: 7 },
    { Name: "Volleyball", CostPerHour: 32, GroupsCount: 7 },
  ]);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    React.useState(false);
  const { notify } = useToastNotify();
  const theme = useTheme();

  const onSuccessCreatingActivity = () => {
    notify("Activity has been created", "success", {
      position: "top-right",
      theme: "colored",
    });
    setIsCreateActivityModalOpen(false);
  };

  const onFailCreatingActivity = (error: AxiosError) => {
    error.response &&
      notify(
        "Activity hasn't been created. Something went wrong. Please contact System Administrator.",
        "error",
        {
          position: "top-right",
          theme: "colored",
        }
      );
    setIsCreateActivityModalOpen(false);
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "2%" }}>
        Activities List
      </Typography>
      <Grid container sx={{ paddingTop: "1%", paddingBottom: "1%" }}>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <IconButton
            onClick={() => setIsCreateActivityModalOpen(true)}
            sx={{ color: theme.palette.primary.main }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={1} lg={1} />
      </Grid>
      <Grid container>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <ActivitiesTable activities={activities} />
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
      <Dialog open={isCreateActivityModalOpen}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsCreateActivityModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <ActivityForm
            onSuccess={onSuccessCreatingActivity}
            onFail={onFailCreatingActivity}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
