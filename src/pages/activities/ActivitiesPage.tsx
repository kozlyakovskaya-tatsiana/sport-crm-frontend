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
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Currency } from "../../Currency";

export const ActivitiesPage: React.FC = (props) => {
  const tableHeaders: string[] = [
    "Activity",
    "Cost per hour",
    "Groups",
    "",
    "",
  ];
  const activityPrices: {
    activityName: string;
    pricePerHour: number;
    groups: number;
  }[] = [
    { activityName: "Volleyball", pricePerHour: 32, groups: 7 },
    { activityName: "Basketball", pricePerHour: 32, groups: 8 },
    { activityName: "Football", pricePerHour: 36, groups: 12 },
    { activityName: "Table Tennis", pricePerHour: 6, groups: 12 },
    { activityName: "Fitness", pricePerHour: 8, groups: 3 },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "2%" }}>
        Price List for activities
      </Typography>
      <Grid container sx={{ paddingTop: "3%", paddingBottom: "1%" }}>
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
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: "300px" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((name) => (
                    <TableCell>{name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {activityPrices.map((activityPrice) => (
                  <TableRow
                    key={activityPrice.activityName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {activityPrice.activityName}
                    </TableCell>
                    <TableCell align="left">{`${activityPrice.pricePerHour} ${Currency.BYN}`}</TableCell>
                    <TableCell align="left">{activityPrice.groups}</TableCell>
                    <TableCell align="left">
                      <Button size="small" variant="contained">
                        <EditIcon fontSize="small" />
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button size="small" variant="contained" color="error">
                        <DeleteIcon fontSize="small" />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};
