import React from "react";
import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DialogWrapperWithCrossButton } from "../../components/DialogWrapperWithCrossButton";
import { CreateActivityForm } from "../../components/sportActivities/activityForm/CreateActivityForm";

export const UsersManagementPage: React.FC = (props) => {
  const [isCreateInstructorModalOpen, setIsCreateInstructorModalOpen] =
    React.useState<boolean>(false);

  const theme = useTheme();

  const renderCreateInstructorDialog = () => (
    <DialogWrapperWithCrossButton
      isOpen={isCreateInstructorModalOpen}
      onCloseModalClick={() => setIsCreateInstructorModalOpen(false)}
    >
      {/* <CreateActivityForm */}
      {/*  onSuccess={onSuccessCreatingActivity} */}
      {/*  onFail={onFailCreatingActivity} */}
      {/* /> */}
      User form
    </DialogWrapperWithCrossButton>
  );

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "3%" }}>
        Instructors
      </Typography>
      <Grid container sx={{ paddingTop: "1%", paddingBottom: "1%" }}>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <IconButton
            // onClick={() => setIsCreateActivityModalOpen(true)}
            sx={{ color: theme.palette.primary.main }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={1} lg={1} />
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
          Table here
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
};
