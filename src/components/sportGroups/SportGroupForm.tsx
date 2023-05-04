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
  useTheme,
} from "@mui/material";
import { Guid } from "guid-typescript";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { FieldArray, Form, Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { object, string, array } from "yup";
import {
  RoundedButton,
  RoundedSelect,
  RoundedTextField,
} from "../../styledComponents/styledComponents";

export interface SportGroupFormProps {
  onSubmit: (values: SportGroupFormValues) => void;
  activities: { name: string; id: Guid }[];
  tenants: { name: string; id: Guid }[];
}
export interface SportGroupFormValues {
  groupName: string;
  activityId: string;
  tenantId: string;
  members: { name: string; phoneNumber: string; id: string }[];
}
const initialFormValues: SportGroupFormValues = {
  members: [{ name: "", phoneNumber: "", id: generateUniqueID() }],
  activityId: "",
  tenantId: "",
  groupName: "",
};
const validationFormGroupSchema = object().shape({
  activityId: string().required("Required"),
  tenantId: string().required("Required"),
  groupName: string().required("Required"),
  members: array().of(
    object({
      name: string().required("Required"),
      phoneNumber: string(),
    })
  ),
});
export const SportGroupForm: React.FC<SportGroupFormProps> = (props) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container direction="row" spacing={1} width="100%">
        <Grid item md={12} xs={12} lg={12} style={{ textAlign: "center" }}>
          <Typography variant="h4">Group</Typography>
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
            validationSchema={validationFormGroupSchema}
            onSubmit={props.onSubmit}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <RoundedTextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="groupName"
                  value={values.groupName}
                  onChange={handleChange}
                  error={touched.groupName && !!errors.groupName}
                  helperText={touched.groupName && errors.groupName}
                />
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Company</InputLabel>
                  <RoundedSelect
                    name="tenantId"
                    value={values.tenantId}
                    label="Company"
                    onChange={handleChange}
                    error={touched.tenantId && !!errors.tenantId}
                  >
                    {props.tenants?.map((tenant) => (
                      <MenuItem value={tenant?.id.toString()}>
                        {tenant?.name}
                      </MenuItem>
                    ))}
                  </RoundedSelect>
                  <Typography
                    color={theme.palette.error.main}
                    fontSize={12}
                    margin="3px 14px 0px 14px "
                  >
                    {touched.tenantId && errors.tenantId}
                  </Typography>
                </FormControl>
                <FieldArray name="members">
                  {(arrayHelpers) => (
                    <>
                      {values.members?.map((member, index) => (
                        <Grid
                          item
                          container
                          spacing={1}
                          alignItems="center"
                          key={member.id}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6}>
                            <RoundedTextField
                              label="Name"
                              name={`members[${index}].name`}
                              fullWidth
                              value={values.members[index]?.name}
                              onChange={handleChange}
                              error={
                                touched.members?.[index]?.name &&
                                !!(
                                  errors.members?.[index] as {
                                    name: string;
                                    phoneNumber: string;
                                  }
                                )?.name
                              }
                            />
                          </Grid>
                          <Grid item xs={5} sm={5} md={5} lg={5}>
                            <RoundedTextField
                              label="Phone"
                              name={`members[${index}].phoneNumber`}
                              fullWidth
                              value={values.members[index]?.phoneNumber}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={1} sm={1} md={1} lg={1}>
                            <IconButton
                              onClick={() => arrayHelpers.remove(index)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <ClearIcon fontSize="large" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid
                        item
                        container
                        spacing={1}
                        alignItems="center"
                        key={generateUniqueID()}
                        paddingTop="2%"
                        paddingBottom="2%"
                      >
                        <Grid item xs={4} sm={4} md={4} lg={4} />
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            endIcon={<AddIcon />}
                            onClick={() =>
                              arrayHelpers.push({
                                name: "",
                                phoneNumber: "",
                                id: generateUniqueID(),
                              })
                            }
                          >
                            Add member
                          </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} />
                      </Grid>
                    </>
                  )}
                </FieldArray>
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
