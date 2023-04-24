import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Guid } from "guid-typescript";
import {
  CreatePlaygroundForm,
  CreateSportPlaygroundFormValues,
} from "../../components/sportplaygrounds/createPlaygroundForm/CreatePlaygroundForm";
import { sportPlaygroundsService } from "../../api/sportPlaygrounds/sportPlaygroundsService";
import { CreateSportPlaygroundRequest } from "../../api/sportPlaygrounds/requests/CreateSportPlaygroundRequest";
import { SportPlayground } from "../../models/SportPlayground";
import { SportPlayGroundCard } from "../../components/sportplaygrounds/sportPlaygroundCard/SportPlayGroundCard";

export const SportPlaygroundsPage: React.FC = (props) => {
  const [sportPlaygrounds, setSportPlaygrounds] = React.useState<
    SportPlayground[]
  >([]);
  const [createPlaygroundModalOpen, setCreatePlaygroundModalOpen] =
    React.useState<boolean>(false);

  const theme = useTheme();

  React.useEffect(() => {
    refreshSportPlaygrounds();
  }, []);

  const refreshSportPlaygrounds = () => {
    sportPlaygroundsService.getSportPlaygrounds().then((response) => {
      setSportPlaygrounds(response.data);
    });
  };

  const onSportPlaygroundSubmit = async (
    values: CreateSportPlaygroundFormValues
  ) => {
    setCreatePlaygroundModalOpen(false);
    const body: CreateSportPlaygroundRequest = {
      AvailableActivitiesIds: values.activitiesIds,
      Base64Image: values.base64Image,
      SportPlaygroundName: values.name,
    };
    try {
      await sportPlaygroundsService.createSportPlayground(body);
      await refreshSportPlaygrounds();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteSportPlaygroundClick = async (id: Guid) => {
    try {
      const response = await sportPlaygroundsService.deleteSportPlayground(id);
      response.data && refreshSportPlaygrounds();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCreateSportPlaygroundDialog = () => (
    <Dialog open={createPlaygroundModalOpen}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setCreatePlaygroundModalOpen(false)}
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
        <CreatePlaygroundForm onSubmit={onSportPlaygroundSubmit} />
      </DialogContent>
    </Dialog>
  );
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "2%" }}>
        Sport Playgrounds
      </Typography>
      <Grid container sx={{ paddingTop: "1%" }}>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            onClick={() => setCreatePlaygroundModalOpen(true)}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={1} lg={1} />
      </Grid>
      <Grid container sx={{ alignItems: "center" }}>
        {sportPlaygrounds?.map((sportPlayground) => (
          <Grid
            item
            md={6}
            xs={12}
            xl={4}
            lg={4}
            key={sportPlayground.id.toString()}
            sx={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}
          >
            <SportPlayGroundCard
              name={sportPlayground.name}
              imgSrc={sportPlayground.image.base64Data}
              activitiesCount={sportPlayground.sportActivities.length}
              onDeleteButtonClick={() =>
                onDeleteSportPlaygroundClick(sportPlayground.id)
              }
            />
          </Grid>
        ))}
      </Grid>
      {renderCreateSportPlaygroundDialog()}
    </>
  );
};
