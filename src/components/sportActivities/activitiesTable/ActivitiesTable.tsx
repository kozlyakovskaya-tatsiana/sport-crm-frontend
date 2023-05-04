import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Currency } from "../../../Currency";
import { useAuth } from "../../../contexts/AuthContext";
import { SportActivity } from "../../../models/SportActivity";
import { StyledTableCell } from "../../../styledComponents/styledComponents";
import { NoDataToDisplay } from "../../NoDataToDisplay";

const instructorsTableHeaders = ["Activity", "Cost per hour", "Groups"];
const adminTableHeaders = [...instructorsTableHeaders, "", ""];

export interface ActivitiesTableProps {
  activities: SportActivity[];
  onDeleteActivityButtonClick: (activityId: string) => void;
}
export const ActivitiesTable: React.FC<ActivitiesTableProps> = (props) => {
  const { isAdmin } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {props.activities?.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  {(!isAdmin
                    ? adminTableHeaders
                    : instructorsTableHeaders
                  )?.map((name) => (
                    <StyledTableCell>{name}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.activities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((activity, index) => (
                    <TableRow
                      key={activity.name + index.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {activity.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{`${activity.costPerHourInByn} ${Currency.BYN}`}</StyledTableCell>
                      <StyledTableCell align="left">
                        {activity.sportGroups.length}
                      </StyledTableCell>
                      {!isAdmin && (
                        <>
                          <StyledTableCell align="left">
                            <Button size="small" variant="contained" disabled>
                              <EditIcon fontSize="small" />
                              Edit
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={() =>
                                props.onDeleteActivityButtonClick(activity.id)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                              Remove
                            </Button>
                          </StyledTableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={props.activities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Box sx={{ height: "350px" }}>
          <NoDataToDisplay />
        </Box>
      )}
    </>
  );
};
