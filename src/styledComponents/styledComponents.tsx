import { Button, styled, TextField } from "@mui/material";

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
