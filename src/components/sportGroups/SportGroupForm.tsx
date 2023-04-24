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
import { Field, FieldArray, Form, Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { object, string, array } from "yup";
import {
  RoundedButton,
  RoundedSelect,
  RoundedTextField,
} from "../../styledComponents/styledComponents";

export interface SportGroupFormProps {
  // onSubmit?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  activities: { name: string; id: Guid }[];
}
export interface SportGroupFormValues {
  groupName: string;
  activityId: string;
  members: { name: string; phoneNumber: string }[];
}
const initialFormValues: SportGroupFormValues = {
  members: [{ name: "", phoneNumber: "" }],
  activityId: "",
  groupName: "",
};
const validationFormGroupSchema = object().shape({
  activityId: string().required("Required"),
  groupName: string().required("Required"),
  members: array().of(
    object({
      name: string().required("Required"),
      phoneNumber: string(),
    })
  ),
});
export const SportGroupForm: React.FC<SportGroupFormProps> = (props) => {
  const [inputs, memberInputs] = React.useState<number>(1);
  const theme = useTheme();

  console.log("render");
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
            // validationSchema={validationFormGroupSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                {/* <RoundedTextField */}
                {/*  fullWidth */}
                {/*  label="Name" */}
                {/*  variant="outlined" */}
                {/*  name="groupName" */}
                {/*  value={values.groupName} */}
                {/*  onChange={handleChange} */}
                {/*  error={touched.groupName && !!errors.groupName} */}
                {/*  helperText={touched.groupName && errors.groupName} */}
                {/* /> */}
                {/* <FormControl fullWidth> */}
                {/*  <InputLabel id="demo-simple-select-label"> */}
                {/*    Activity */}
                {/*  </InputLabel> */}
                {/*  <RoundedSelect */}
                {/*    value={values.activityId} */}
                {/*    name="activityId" */}
                {/*    label="Activity" */}
                {/*    onChange={handleChange} */}
                {/*    error={touched.activityId && !!errors.activityId} */}
                {/*  > */}
                {/*    {props.activities?.map((activity) => ( */}
                {/*      <MenuItem */}
                {/*        value={activity.id.toString()} */}
                {/*        key={activity.id.toString()} */}
                {/*      > */}
                {/*        {activity.name} */}
                {/*      </MenuItem> */}
                {/*    ))} */}
                {/*  </RoundedSelect> */}
                {/*  <Typography */}
                {/*    color={theme.palette.error.main} */}
                {/*    fontSize={12} */}
                {/*    margin="3px 14px 0px 14px " */}
                {/*  > */}
                {/*    {touched.activityId && errors.activityId} */}
                {/*  </Typography> */}
                {/* </FormControl> */}
                {/* <FormControl fullWidth margin="normal"> */}
                {/*  <InputLabel>Company</InputLabel> */}
                {/*  <RoundedSelect */}
                {/*    value={value} */}
                {/*    label="Activity" */}
                {/*    onChange={(e) => setValue2(e.target.value as string)} */}
                {/*  > */}
                {/*    {props.activities?.map((activity) => ( */}
                {/*      <MenuItem value={activity.id.toString()}> */}
                {/*        {activity.name} */}
                {/*      </MenuItem> */}
                {/*    ))} */}
                {/*  </RoundedSelect> */}
                {/* </FormControl> */}
                <FieldArray name="members">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.members?.length > 0 &&
                        values.members.map((members, index) => (
                          <div className="row" key={generateUniqueID()}>
                            <div className="col">
                              <input
                                name={`members.${index}.name`}
                                value={values.members[index].name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col">
                              <Field
                                name={`members.${index}.phoneNumber`}
                                placeholder="jane@acme.com"
                                type="email"
                              />
                            </div>
                            {/* <div className="col"> */}
                            {/*  <button */}
                            {/*    type="button" */}
                            {/*    className="secondary" */}
                            {/*    onClick={() => remove(index)} */}
                            {/*  > */}
                            {/*    X */}
                            {/*  </button> */}
                            {/* </div> */}
                          </div>
                        ))}
                      {/* <button */}
                      {/*  type="button" */}
                      {/*  className="secondary" */}
                      {/*  onClick={() => push({ name: "", email: "" })} */}
                      {/* > */}
                      {/*  Add members */}
                      {/* </button> */}
                    </div>
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
