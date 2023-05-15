import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  RoundedButton,
  RoundedSelect,
  RoundedTextField,
} from "../../../styledComponents/styledComponents";

export interface LessonFormProps {
  activities: { name: string; id: string }[];
  sportGroups: { name: string; id: string }[];
  sportInstructors: { name: string; id: string }[];
  onSubmit: (values: LessonFormValues) => void;
}
export interface LessonFormValues {
  activityId: string;
  sportGroupId: string;
  instructorId: string;
  fromDate: Date;
  toDate: Date;
  fromTime: Date;
  toTime: Date;
}
const initialFormValues: LessonFormValues = {
  fromDate: new Date(),
  toDate: new Date(),
  fromTime: new Date(),
  toTime: new Date(),
  activityId: "",
  instructorId: "",
  sportGroupId: "",
};

export const LessonForm: React.FC<LessonFormProps> = (props) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container direction="row" spacing={1} width="100%">
        <Grid item md={12} xs={12} lg={12} style={{ textAlign: "center" }}>
          <Typography variant="h4">Lesson</Typography>
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
            // validationSchema={validationFormGroupSchema}
            onSubmit={props.onSubmit}
          >
            {({ values, handleChange, errors, touched, setFieldValue }) => (
              <Form>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Activity
                  </InputLabel>
                  <RoundedSelect
                    value={values.activityId}
                    name="activityId"
                    label="Activity"
                    onChange={handleChange}
                    error={touched.activityId && !!errors.activityId}
                  >
                    {props.activities?.map((activity) => (
                      <MenuItem
                        value={activity.id.toString()}
                        key={activity.id.toString()}
                      >
                        {activity.name}
                      </MenuItem>
                    ))}
                  </RoundedSelect>
                  <Typography
                    color={theme.palette.error.main}
                    fontSize={12}
                    margin="3px 14px 0px 14px "
                  >
                    {touched.activityId && errors.activityId}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Sport group
                  </InputLabel>
                  <RoundedSelect
                    value={values.sportGroupId}
                    name="sportGroupId"
                    label="Sport group"
                    onChange={handleChange}
                    error={touched.sportGroupId && !!errors.sportGroupId}
                  >
                    {props.sportGroups?.map((group) => (
                      <MenuItem
                        value={group.id.toString()}
                        key={group.id.toString()}
                      >
                        {group.name}
                      </MenuItem>
                    ))}
                  </RoundedSelect>
                  <Typography
                    color={theme.palette.error.main}
                    fontSize={12}
                    margin="3px 14px 0px 14px "
                  >
                    {touched.sportGroupId && errors.sportGroupId}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Instructor
                  </InputLabel>
                  <RoundedSelect
                    value={values.instructorId}
                    name="instructorId"
                    label="Instructor"
                    onChange={handleChange}
                    error={touched.instructorId && !!errors.instructorId}
                  >
                    {props.sportInstructors?.map((instructor) => (
                      <MenuItem
                        value={instructor.id.toString()}
                        key={instructor.id.toString()}
                      >
                        {instructor.name}
                      </MenuItem>
                    ))}
                  </RoundedSelect>
                  <Typography
                    color={theme.palette.error.main}
                    fontSize={12}
                    margin="3px 14px 0px 14px "
                  >
                    {touched.instructorId && errors.instructorId}
                  </Typography>
                </FormControl>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                  spacing={1}
                >
                  <Grid item md={2} xs={2} lg={2}>
                    <Typography textAlign="center">From</Typography>
                  </Grid>
                  <Grid item md={5} xs={5} lg={5}>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      onChange={(value) => setFieldValue("fromDate", value)}
                      value={values.fromDate}
                      renderInput={(props) => (
                        <RoundedTextField
                          fullWidth
                          name="fromDate"
                          {...props}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={5} xs={5} lg={5}>
                    <TimePicker
                      inputFormat="HH:mm"
                      onChange={(value) => {
                        setFieldValue("fromTime", value);
                      }}
                      value={values.fromTime}
                      renderInput={(props) => (
                        <RoundedTextField
                          fullWidth
                          {...props}
                          name="fromTime"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} lg={2}>
                    <Typography textAlign="center">To</Typography>
                  </Grid>
                  <Grid item md={5} xs={5} lg={5}>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      onChange={(value) => setFieldValue("toDate", value)}
                      value={values.toDate}
                      renderInput={(props) => (
                        <RoundedTextField fullWidth name="toDate" {...props} />
                      )}
                    />
                  </Grid>
                  <Grid item md={5} xs={5} lg={5}>
                    <TimePicker
                      inputFormat="HH:mm"
                      onChange={(value) => {
                        setFieldValue("toTime", value);
                      }}
                      value={values.toTime}
                      renderInput={(props) => (
                        <RoundedTextField fullWidth {...props} name="toTime" />
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
