import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DialogWrapperWithCrossButton } from "../../components/DialogWrapperWithCrossButton";
import {
  SportGroupForm,
  SportGroupFormValues,
} from "../../components/sportGroups/SportGroupForm";
import { SportActivity } from "../../models/SportActivity";
import { sportActivitiesService } from "../../api/activities/activitiyService";
import { Tenant } from "../../models/Tenant";
import { tenantsService } from "../../api/tenants/tenantService";
import { CreateSportGroupRequest } from "../../api/sportGroups/requests/CreateSportGroupRequest";
import { sportGroupService } from "../../api/sportGroups/sportGroupService";
import { SportGroup } from "../../models/SportGroup";
import { SportGroupView } from "../../api/sportGroups/viewModels/SportGroupView";

const membersTableHeaders = ["Name", "Phone number"];

export const GroupsPage: React.FC = (props) => {
  const [isGroupModalDialogOpen, setIsGroupModalDialogOpen] =
    React.useState(false);
  const [sportActivities, setSportActivities] = React.useState<SportActivity[]>(
    []
  );
  const [tenants, setTenants] = React.useState<Tenant[]>([]);
  const [sportGroups, setSportGroups] = React.useState<SportGroupView[]>([]);

  const theme = useTheme();

  React.useEffect(() => {
    loadSportGroups();
    loadSportActivities();
    loadTenants();
  }, []);

  const loadSportGroups = () => {
    sportGroupService.getSportGroups().then((response) => {
      setSportGroups(response.data);
    });
  };

  const loadSportActivities = () => {
    sportActivitiesService.getActivities().then((response) => {
      setSportActivities(response.data);
    });
  };

  const loadTenants = () => {
    tenantsService.getTenants().then((response) => {
      setTenants(response.data);
    });
  };

  const onCreateSportGroupSubmit = (values: SportGroupFormValues) => {
    const body: CreateSportGroupRequest = {
      activityId: values.activityId,
      members: values.members?.map((m) => ({
        name: m.name,
        mobilePhoneNumber: m.phoneNumber,
      })),
      name: values.groupName,
      tenantId: values.tenantId,
    };
    sportGroupService.createSportGroup(body).then((response) => {
      setIsGroupModalDialogOpen(false);
      loadSportGroups();
    });
  };

  const renderGroupFormDialog = () => (
    <DialogWrapperWithCrossButton
      isOpen={isGroupModalDialogOpen}
      onCloseModalClick={() => setIsGroupModalDialogOpen(false)}
    >
      <SportGroupForm
        activities={sportActivities?.map((sportActivity) => ({
          name: sportActivity.name,
          id: sportActivity.id,
        }))}
        tenants={tenants?.map((tenant) => ({
          name: tenant?.name,
          id: tenant?.id,
        }))}
        onSubmit={onCreateSportGroupSubmit}
      />
    </DialogWrapperWithCrossButton>
  );

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "3%" }}>
        Groups
      </Typography>
      <Grid container sx={{ paddingTop: "2%", paddingBottom: "1%" }}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <IconButton
            onClick={() => setIsGroupModalDialogOpen(true)}
            sx={{ color: theme.palette.primary.main }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          {sportGroups?.map((group) => (
            <Accordion
              sx={{ width: "100%", minWidth: "750px" }}
              key={group?.id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{group?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert
                  severity="info"
                  sx={{
                    marginBottom: "1em",
                    ".MuiAlert-message": {
                      width: "100%",
                    },
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <Typography>
                        <strong>Company: </strong> {group?.tenant?.name}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Typography>
                        <strong>Activity:</strong>
                        {group?.sportActivity?.name}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Typography>
                        <strong>Contract:</strong>{" "}
                        {new Date(
                          group?.tenant?.contract?.startDate
                        )?.toLocaleDateString()}
                        -
                        {new Date(
                          group?.tenant?.contract?.endDate
                        )?.toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                </Alert>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: "300px" }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        {membersTableHeaders.map((header) => (
                          <TableCell>{header}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group?.members?.map((member, index) => (
                        <TableRow
                          key={member?.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {member?.name}
                          </TableCell>
                          <TableCell align="left">
                            {member?.mobilePhoneNumber}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    paddingTop: "3%",
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ marginRight: "2%" }}
                  >
                    <EditIcon fontSize="small" />
                    Edit
                  </Button>
                  <Button size="small" variant="contained" color="error">
                    <DeleteIcon fontSize="small" />
                    Remove
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={3} />
      </Grid>
      {renderGroupFormDialog()}
    </>
  );
};
