import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import {
  RoundedButton,
  RoundedTextField,
} from "../../../styledComponents/styledComponents";

export interface TenantFormProps {
  onSubmit: (values: TenantFormValues) => void;
}
export interface TenantFormValues {
  name: string;
  contractStartDate: string;
  contractEndDate: string;
}

const initialFormValues: TenantFormValues = {
  contractEndDate: "",
  contractStartDate: "",
  name: "",
};
const validationTenantFormSchema = object().shape({
  name: string().required("Required"),
  contractStartDate: string().required("Required"),
  contractEndDate: string().required("Required"),
});
export const TenantForm: React.FC<TenantFormProps> = (props) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container direction="row" spacing={1} width="100%">
        <Grid item md={12} xs={12} lg={12} style={{ textAlign: "center" }}>
          <Typography variant="h4">Tenant</Typography>
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
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationTenantFormSchema}
            onSubmit={props.onSubmit}
          >
            {({ values, handleChange, errors, touched, setFieldValue }) => (
              <Form>
                <RoundedTextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <DatePicker
                      value={values.contractStartDate}
                      inputFormat="DD/MM/YYYY"
                      onChange={(value) => {
                        setFieldValue(
                          "contractStartDate",
                          moment(value).toDate()
                        );
                        if (moment(value).isAfter(values.contractEndDate)) {
                          setFieldValue(
                            "contractEndDate",
                            moment(value).toDate()
                          );
                        }
                      }}
                      renderInput={(params) => (
                        <RoundedTextField
                          {...params}
                          fullWidth
                          label="Contract Start Date"
                          name="contractStartDate"
                          error={
                            touched.contractStartDate &&
                            !!errors.contractStartDate
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <DatePicker
                      value={values.contractEndDate}
                      onChange={(value) => {
                        setFieldValue(
                          "contractEndDate",
                          moment(value).toDate()
                        );
                      }}
                      minDate={values.contractStartDate}
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => (
                        <RoundedTextField
                          {...params}
                          fullWidth
                          label="Contract End Date"
                          name="contractEndDate"
                          error={
                            touched.contractEndDate && !!errors.contractEndDate
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <RoundedButton
                  fullWidth
                  style={{ height: "40px" }}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  <span>Submit</span>
                </RoundedButton>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item md={1} xs={1} lg={1} />
      </Grid>
    </Box>
  );
};
