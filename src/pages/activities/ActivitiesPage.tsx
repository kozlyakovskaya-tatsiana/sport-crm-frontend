import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  useTheme,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { AxiosError } from "axios";
import { CreateActivityForm } from "../../components/sportActivities/activityForm/CreateActivityForm";
import { useToastNotify } from "../../contexts/NotificationToastContext";
import { ActivitiesTable } from "../../components/sportActivities/activitiesTable/ActivitiesTable";
import { SportActivity } from "../../models/SportActivity";
import { sportActivitiesService } from "../../api/activities/activitiyService";
import { DialogWrapperWithCrossButton } from "../../components/DialogWrapperWithCrossButton";

export const ActivitiesPage: React.FC = (props) => {
  const [activities, setActivities] = React.useState<SportActivity[]>([]);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    React.useState(false);
  const [openDeleteWarningDialog, setOpenDeleteWarningDialog] =
    React.useState(false);
  const [selectedActivityId, setSelectedActivityId] =
    React.useState<string>("");
  const { notify } = useToastNotify();
  const theme = useTheme();

  React.useEffect(() => {
    refreshActivityData();
  }, []);

  const refreshActivityData = () => {
    sportActivitiesService
      .getActivities()
      .then((response) => {
        setActivities(response.data);
      })
      .catch(() => notify("Error while loading activities data."));
  };

  const onSuccessCreatingActivity = () => {
    refreshActivityData();
    notify("Activity has been created", "success", {
      position: "top-right",
      theme: "colored",
    });
    setIsCreateActivityModalOpen(false);
  };

  const onFailCreatingActivity = (error: AxiosError) => {
    if (error?.response) {
      let errorMessage =
        "Activity hasn't been created. Something went wrong. Please contact System Administrator.";
      if (error.response.status === 409) {
        errorMessage =
          "Activity with this name already exists. Please use another name.";
      }
      notify(errorMessage, "error", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  const renderCreateActivityDialog = () => (
    <DialogWrapperWithCrossButton
      isOpen={isCreateActivityModalOpen}
      onCloseModalClick={() => setIsCreateActivityModalOpen(false)}
    >
      <CreateActivityForm
        onSuccess={onSuccessCreatingActivity}
        onFail={onFailCreatingActivity}
      />
    </DialogWrapperWithCrossButton>
  );

  const handleCloseDeleteWarningDialog = () => {
    setOpenDeleteWarningDialog(false);
  };

  const handleConfirmDeleteWarningDialog = async () => {
    try {
      await sportActivitiesService.deleteActivity(selectedActivityId);
      setOpenDeleteWarningDialog(false);
      await refreshActivityData();
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 404) {
        notify(
          "There is no activity with such name, please refresh page.",
          "error"
        );
      }
    }
  };

  const deleteActivityButtonClickHandler = (activityId: string) => {
    setSelectedActivityId(activityId);
    setOpenDeleteWarningDialog(true);
  };

  const renderDeleteWarningDialog = () => (
    <Dialog
      open={openDeleteWarningDialog}
      onClose={handleCloseDeleteWarningDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete activity?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDeleteWarningDialog}>No</Button>
        <Button onClick={handleConfirmDeleteWarningDialog} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

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
          <ActivitiesTable
            activities={activities}
            onDeleteActivityButtonClick={deleteActivityButtonClickHandler}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
      {renderCreateActivityDialog()}
      {renderDeleteWarningDialog()}
    </>
  );
};
