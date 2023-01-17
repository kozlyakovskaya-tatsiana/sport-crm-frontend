import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const GroupsPage: React.FC = (props) => {
  const groupsData: {
    name: string;
    members: string[];
    activity: string;
    company?: string;
  }[] = [
    {
      name: "Godel Volleyball",
      members: [
        "Bogdan Khakimov",
        "Andrej Andreev",
        "Victor Victorov",
        "Denis Ivanov",
        "Alex Sidorov",
        "Boris Bagadov",
      ],
      activity: "Football",
    },
    {
      name: "iTechart Basketball",
      members: [
        "Bernadette Carlson",
        "Sylvia Rowe",
        "Heidi Moss",
        "Lucas Wagner",
        "Lorenzo Peterson",
        "Barbara Garner",
        "Robin Gross",
        "Bradford Hughes",
        "Anna Brewer",
        "Nadine Garrett",
      ],
      activity: "Basketball",
    },
    {
      name: "OblGaz FootBall",
      members: [
        "Boris Bagadov",
        "Bradford Hughes",
        "Anna Brewer",
        "Nadine Garrett",
      ],
      activity: "Volleyball",
    },
  ];
  const groupTableHeaders: string[] = ["Name", "Phone number"];

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "3%" }}>
        Groups
      </Typography>
      <Grid container sx={{ paddingTop: "2%", paddingBottom: "1%" }}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Button variant="contained">
            <AddIcon />
            Add new
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          {groupsData.map((groupData) => (
            <Accordion sx={{ width: "100%", minWidth: "750px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{groupData.name}</Typography>
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
                        <strong>Company: </strong> OblGaz
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Typography>
                        <strong>Activity:</strong>
                        {groupData.activity}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Typography>
                        <strong>Contract:</strong> 1 March 2022 - 20 December
                        2022
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
                        {groupTableHeaders.map((header) => (
                          <TableCell>{header}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupData.members.map((member, index) => (
                        <TableRow
                          key={member}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {member}
                          </TableCell>
                          <TableCell align="left">
                            {index === 0 && "+37533xxxxxxxx"}
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
    </>
  );
};
