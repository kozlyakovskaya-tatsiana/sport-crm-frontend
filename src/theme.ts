import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a2faf6",
      main: "#1eb6f7",
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
            backgroundColor: "#a2faf6",
          },
        },
      },
    },
  },
});

export default theme;
