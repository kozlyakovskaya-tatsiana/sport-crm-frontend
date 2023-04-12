import React from "react";
import { useFormik } from "formik";
import { Grid, InputAdornment, SxProps, Typography } from "@mui/material";
import * as Yup from "yup";
import { number, string } from "yup";
import { AxiosError } from "axios";
import {
  RoundedButton,
  RoundedTextField,
} from "../../styledComponents/styledComponents";
import { activityService } from "../../api/activities/activitiyService";

export interface ActivityFormProps {
  onSuccess?: () => void;
  onFail?: (error: AxiosError) => void;
}
interface ActivityFormValues {
  name: string;
  costPerHour: number;
}
const activityFormValidationSchema = Yup.object({
  name: string().required("Required"),
  costPerHour: number()
    .required("Required")
    .positive("Cost must be positive value"),
});
export const CreateActivityForm: React.FC<ActivityFormProps> = (props) => {
  const [creatingActivityInProgress, setCreatingActivityInProgress] =
    React.useState<boolean>(false);

  const createActivity = (activity: ActivityFormValues) => {
    setCreatingActivityInProgress(true);
    activityService
      .createActivity({
        activityName: activity.name,
        costPerHourInByn: activity.costPerHour,
      })
      .then(() => {
        props.onSuccess?.();
      })
      .catch((error) => {
        props.onFail?.(error);
      })
      .finally(() => {
        setCreatingActivityInProgress(false);
      });
  };

  const formik = useFormik({
    initialValues: { name: "", costPerHour: 0 },
    validationSchema: activityFormValidationSchema,
    onSubmit: createActivity,
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={1}
    >
      <Grid item md={3} xs={2} />
      <Grid item md={1} xs={1}>
        <Typography variant="h4">Create new activity</Typography>
      </Grid>
      <Grid item md={5} xs={5}>
        <form onSubmit={formik.handleSubmit}>
          <RoundedTextField
            fullWidth
            label="Name"
            variant="outlined"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <RoundedTextField
            type="number"
            fullWidth
            label="Cost per hour"
            variant="outlined"
            id="costPerHour"
            name="costPerHour"
            value={formik.values.costPerHour}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.costPerHour && !!formik.errors.costPerHour}
            helperText={formik.touched.costPerHour && formik.errors.costPerHour}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">BYN</InputAdornment>
              ),
              inputMode: "numeric",
            }}
          />
          <RoundedButton
            fullWidth
            style={{ height: "40px" }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={creatingActivityInProgress}
          >
            <span>Create</span>
          </RoundedButton>
        </form>
      </Grid>
      <Grid item md={1} xs={1} />
      <Grid item md={2} xs={3} />
    </Grid>
  );
};
