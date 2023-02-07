import { Button, styled, TableCell, TableRow, TextField } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

export const RoundedTextField = styled(TextField)({
  ".MuiInputBase-root": {
    borderRadius: "20px",
  },
});

export const RoundedButton = styled(Button)({
  "&.MuiButtonBase-root": {
    borderRadius: "20px",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
