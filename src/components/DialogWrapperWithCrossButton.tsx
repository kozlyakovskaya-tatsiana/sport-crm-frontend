import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogWrapperWithCrossButtonProps {
  isOpen: boolean;
  onCloseModalClick: () => void;
  children: React.ReactNode;
}
export const DialogWrapperWithCrossButton: React.FC<
  DialogWrapperWithCrossButtonProps
> = (props) => (
  <Dialog open={props.isOpen} fullWidth maxWidth="md">
    <DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => props.onCloseModalClick()}
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
    <DialogContent>{props.children}</DialogContent>
  </Dialog>
);
