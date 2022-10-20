import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a2faf6",
      main: "#2adff7",
    },
    secondary: {
      main: "#50faf7",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiButton-root:hover": {
            backgroundColor: "#d5f7f7",
          },
        },
      },
    },
  },
});

export default theme;
