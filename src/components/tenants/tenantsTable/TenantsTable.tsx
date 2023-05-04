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
import { Guid } from "guid-typescript";
import moment from "moment";
import { Currency } from "../../../Currency";
import { useAuth } from "../../../contexts/AuthContext";
import { SportActivity } from "../../../models/SportActivity";
import { StyledTableCell } from "../../../styledComponents/styledComponents";
import { NoDataToDisplay } from "../../NoDataToDisplay";
import { Tenant } from "../../../models/Tenant";

const tenantTableHeaders = [
  "Name",
  "Contract Start Date",
  "Contract End Date",
  "Groups",
  "",
  "",
];

export interface TenantsTableProps {
  tenants: Tenant[];
}
export const TenantsTable: React.FC<TenantsTableProps> = (props) => {
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
      {props.tenants?.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  {tenantTableHeaders.map((name) => (
                    <StyledTableCell>{name}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.tenants
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((tenant, index) => (
                    <TableRow
                      key={tenant?.name + index.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {tenant?.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{`${new Date(
                        tenant?.contract?.startDate
                      ).toLocaleDateString()} `}</StyledTableCell>
                      <StyledTableCell align="left">{`${new Date(
                        tenant?.contract?.endDate
                      ).toLocaleDateString()} `}</StyledTableCell>
                      <StyledTableCell align="left">
                        {tenant?.sportGroups?.length}
                      </StyledTableCell>
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
                          disabled
                        >
                          <DeleteIcon fontSize="small" />
                          Remove
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={props.tenants?.length}
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
