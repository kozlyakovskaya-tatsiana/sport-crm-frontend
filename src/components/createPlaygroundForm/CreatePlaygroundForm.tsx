import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
import { Guid } from "guid-typescript";
import { useFormik } from "formik";
import {
  RoundedButton,
  RoundedTextField,
} from "../../styledComponents/styledComponents";
import { SportActivity } from "../../models/SportActivity";
import { activityService } from "../../api/activities/activitiyService";
import { UploadFilesArea } from "../UploadFilesArea";
import { useToastNotify } from "../../contexts/NotificationToastContext";

export interface CreateSportPlaygroundFormValues {
  name: string;
  activitiesIds: Guid[];
  base64Image: string;
}
const initialValues: CreateSportPlaygroundFormValues = {
  base64Image: "",
  name: "",
  activitiesIds: [],
};

const createSportPlaygroundFormValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  base64Image: Yup.string().required("Required"),
  activitiesIds: Yup.array().min(1, "At least 1 activity is required"),
});
export interface CreatePlaygroundFormProps {
  onSubmit: (value: CreateSportPlaygroundFormValues) => void;
}
export const CreatePlaygroundForm: React.FC<CreatePlaygroundFormProps> = (
  props
) => {
  const [sportActivities, setSportActivities] = React.useState<SportActivity[]>(
    []
  );
  const [imageSrc, setImageSrc] = React.useState<string>("");
  const inputToUploadImage = React.useRef<HTMLInputElement>(null);

  const { notify } = useToastNotify();
  const theme = useTheme();

  React.useEffect(() => {
    activityService
      .getActivities()
      .then((response) => setSportActivities(response.data));

    inputToUploadImage.current?.addEventListener("change", onSelectImage);
    return () => {
      inputToUploadImage.current?.removeEventListener("change", onSelectImage);
    };
  }, []);

  const formik = useFormik<CreateSportPlaygroundFormValues>({
    initialValues,
    validationSchema: createSportPlaygroundFormValidationSchema,
    onSubmit: (values: CreateSportPlaygroundFormValues) => {
      props.onSubmit(values);
    },
  });

  const openImageBrowserDialog = () => {
    inputToUploadImage?.current?.click?.();
  };

  const onSelectImage = (event: any) => {
    const selectedFile = event.target.files[0];
    event.target.value = "";
    loadImage(selectedFile);
  };

  const loadImage = (file: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      setImageSrc(event.target.result);
      formik.setFieldValue("base64Image", event.target.result);
    });
    reader.addEventListener("error", () => {
      notify("Error while uploading image, please try again.", "error");
    });
    reader.readAsDataURL(file);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={1}
    >
      <Grid item md={3} xs={2} lg={3} />
      <Grid item md={1} xs={1} lg={1}>
        <Typography variant="h4">New playground</Typography>
      </Grid>
      <Grid item md={5} xs={5} lg={5}>
        <form onSubmit={formik.handleSubmit}>
          {imageSrc && <img src={imageSrc} width="100%" alt="Uploaded" />}
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
          <UploadFilesArea onClick={() => openImageBrowserDialog()} />
          <input ref={inputToUploadImage} type="file" hidden accept="image/*" />
          <Typography color={theme.palette.error.main}>
            {formik.touched.base64Image && formik.errors.base64Image}
          </Typography>
          {sportActivities?.map((activity) => (
            <FormControlLabel
              control={
                <Checkbox
                  name="activitiesIds"
                  onChange={formik.handleChange}
                  value={activity.id}
                  key={activity?.id.toString()}
                  title={activity?.name}
                />
              }
              label={activity?.name}
              key={activity?.id.toString()}
            />
          ))}
          <Typography color={theme.palette.error.main}>
            {formik.touched.activitiesIds &&
              formik.errors.activitiesIds?.toString()}
          </Typography>
          <RoundedButton
            fullWidth
            style={{ height: "40px" }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            <span>Create</span>
          </RoundedButton>
        </form>
      </Grid>
      <Grid item md={3} xs={4} />
    </Grid>
  );
};
