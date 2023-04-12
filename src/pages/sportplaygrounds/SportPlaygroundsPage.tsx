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
import { SectionCardProps } from "../../components/cards/SimpleCard";
import {
  CreatePlaygroundForm,
  CreateSportPlaygroundFormValues,
} from "../../components/createPlaygroundForm/CreatePlaygroundForm";
import { sportPlaygroundsService } from "../../api/sportPlaygrounds/sportPlaygroundsService";
import { CreateSportPlaygroundRequest } from "../../api/sportPlaygrounds/requests/CreateSportPlaygroundRequest";

export const SportPlaygroundsPage: React.FC = (props) => {
  const [createPlaygroundModalOpen, setCreatePlaygroundModalOpen] =
    React.useState<boolean>(false);
  const theme = useTheme();

  const playgroundCards: SectionCardProps[] = [
    {
      title: "1 sprotzal",
      // image: <TodayIcon sx={baseSxPropsForIcons} />,
    },
    {
      title: "2 sportzal",
      // image: <Diversity3Icon sx={baseSxPropsForIcons} />,
    },
    {
      title: "3 sportzal",
      // image: <SportsVolleyballIcon sx={baseSxPropsForIcons} />,
    },
  ];

  const refreshSportPlaygrounds = async () => {
    await sportPlaygroundsService.getSportPlaygrounds();
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
      <Grid container sx={{ paddingTop: "1%", paddingBottom: "1%" }}>
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
        {/* {playgroundCards.map((card) => ( */}
        {/*  <Grid */}
        {/*    item */}
        {/*    md={6} */}
        {/*    xs={12} */}
        {/*    xl={4} */}
        {/*    lg={4} */}
        {/*    key={generateUniqueID()} */}
        {/*    sx={{ display: "flex", justifyContent: "center", paddingTop: "5%" }} */}
        {/*  > */}
        {/*    <SimpleCard */}
        {/*      title={card?.title} */}
        {/*      image={card?.image} */}
        {/*      onClick={card.onClick} */}
        {/*    /> */}
        {/*  </Grid> */}
        {/* ))} */}
      </Grid>
      {renderCreateSportPlaygroundDialog()}
    </>
  );
};
