import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { string } from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import AddIcon from "@mui/icons-material/Add";
import {
  RoundedButton,
  RoundedSelect,
  RoundedTextField,
} from "../../../styledComponents/styledComponents";

export const UserForm: React.FC = (props) => {
  console.log("Form");

  return (
    <Box>
      <Grid container direction="row" spacing={1} width="100%">
        <Grid item md={12} xs={12} lg={12} style={{ textAlign: "center" }}>
          <Typography variant="h4">Instructor</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={1}
      >
        <Grid item md={1} xs={1} lg={1} />
        <Grid item md={10} xs={10} lg={10}>
          {/* <Formik */}
          {/*  initialValues={initialFormValues} */}
          {/*  validationSchema={validationFormGroupSchema} */}
          {/*  onSubmit={props.onSubmit} */}
          {/* > */}
          {/*  {({ values, handleChange, errors, touched }) => <Form />} */}
          {/* </Formik> */}
        </Grid>
        <Grid item md={1} xs={1} lg={1} />
      </Grid>
    </Box>
  );
};
