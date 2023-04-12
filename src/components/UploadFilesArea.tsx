import React from "react";
import { Box, Button } from "@mui/material";

export interface UploadFilesAreaProps {
  onClick?: () => void;
}
export const UploadFilesArea: React.FC<UploadFilesAreaProps> = (props) => (
  <Box
    component="div"
    sx={{
      p: 2,
      border: "1px dashed grey",
      justifyContent: "center",
      display: "flex",
    }}
    onClick={() => props.onClick?.()}
  >
    <Button>Upload image</Button>
  </Box>
);
