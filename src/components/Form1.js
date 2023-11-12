import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

const validationSchema = Yup.object({
  // Define validation rules for your form fields
  firstName: Yup.string().required("required"),
  laststName: Yup.string().required("required"),
  phoneNumber: Yup.number()
    .required("required")
    .min(10, "phone number must be at least 10 digits"),
  email: Yup.string().required("required"),
  otherPhoneNumber: Yup.number()
    .required("required")
    .min(10, "phone number must be at least 10 digits"),
  imei: Yup.number().required("required"),
  deviceMake: Yup.string().required("required"),
  model: Yup.string().required("required"),
});

const steps = ["Customer Details", "Phone Details", "Fault Details", "Summary"];
const display = [
  "Cracked Screen",
  "No Display",
  "Displays Lines",
  "Inverted Display",
  "Touch not working",
  "Other",
  "N/A",
];
const power = [
  "Does not Power",
  "Does not charge",
  "Short Battery life",
  "Swollen Battery",
  "Charging port not working",
  "Other",
  "N/A",
];
const sound = [
  "No sound",
  "Cracking sound",
  "Works only on loudspeaker",
  "mic not working",
  "Low volume",
  "Other",
  "N/A",
];
const software = ["Goes on and off", "Needs software update", "Other", "N/A"];

const Form1 = () => {
  const formik = useFormik({
    initialValues: {
      itemName: "",
      quantity: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({});

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormValues = (values) => {
    setFormValues({ ...formValues, ...values });
  };

  const handleSubmit = () => {
    // Handle final form submission logic here
    console.log("Final form values:", formValues);
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Phone Booking Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {steps.map((step, index) => (
          <div
            key={index}
            style={{ display: index === currentStep ? "block" : "none" }}
          >
            <Typography variant="h6">{step}</Typography>

            {index === 0 && (
              <>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middleName}
                  error={
                    formik.touched.middleName &&
                    Boolean(formik.errors.middleName)
                  }
                  helperText={
                    formik.touched.middleName && formik.errors.middleName
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="otherPhoneNumber"
                  name="otherPhoneNumber"
                  label="Other Phone Number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otherPhoneNumber}
                  error={
                    formik.touched.otherPhoneNumber &&
                    Boolean(formik.errors.otherPhoneNumber)
                  }
                  helperText={
                    formik.touched.otherPhoneNumber &&
                    formik.errors.otherPhoneNumber
                  }
                  margin="normal"
                />
              </>
            )}

            {index === 1 && (
              <>
                <TextField
                  fullWidth
                  id="imei"
                  name="imei"
                  label="IMEI"
                  type="number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imei}
                  error={formik.touched.imei && Boolean(formik.errors.imei)}
                  helperText={formik.touched.imei && formik.errors.imei}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="deviceMake"
                  name="deviceMake"
                  label="Device Make"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deviceMake}
                  error={
                    formik.touched.deviceMake &&
                    Boolean(formik.errors.deviceMake)
                  }
                  helperText={
                    formik.touched.deviceMake && formik.errors.deviceMake
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="model"
                  name="model"
                  label="Model"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.model}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="dateOfPurchase"
                  name="dateOfPurchase"
                  label="Date Of Purchase"
                  type="date"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfPurchase}
                  error={
                    formik.touched.dateOfPurchase &&
                    Boolean(formik.errors.dateOfPurchase)
                  }
                  helperText={
                    formik.touched.dateOfPurchase &&
                    formik.errors.dateOfPurchase
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="placeOfPurchase"
                  name="placeOfPurchase"
                  label="Place Of Purchase"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.placeOfPurchase}
                  error={
                    formik.touched.placeOfPurchase &&
                    Boolean(formik.errors.placeOfPurchase)
                  }
                  helperText={
                    formik.touched.placeOfPurchase &&
                    formik.errors.placeOfPurchase
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="warrantyStatus"
                  name="warrantyStatus"
                  label="Warranty Status"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.warrantyStatus}
                  error={
                    formik.touched.warrantyStatus &&
                    Boolean(formik.errors.warrantyStatus)
                  }
                  helperText={
                    formik.touched.warrantyStatus &&
                    formik.errors.warrantyStatus
                  }
                  margin="normal"
                />
              </>
            )}
            {index === 2 && (
              <>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="display-label">Display</InputLabel>
                  <Select
                    labelId="display-label"
                    id="display"
                    name="display"
                    label="Display"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.display}
                    error={
                      formik.touched.display && Boolean(formik.errors.display)
                    }
                  >
                    {display.map((display) => (
                      <MenuItem key={display} value={display}>
                        {display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="power-label">Power</InputLabel>
                  <Select
                    labelId="power-label"
                    id="power"
                    name="power"
                    label="Power"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.power}
                    error={formik.touched.power && Boolean(formik.errors.power)}
                  >
                    {power.map((power) => (
                      <MenuItem key={power} value={power}>
                        {power}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="sound-label">Sound</InputLabel>
                  <Select
                    labelId="sound-label"
                    id="sound"
                    name="sound"
                    label="Sound"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sound}
                    error={formik.touched.sound && Boolean(formik.errors.sound)}
                  >
                    {sound.map((sound) => (
                      <MenuItem key={sound} value={sound}>
                        {sound}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="software-label">Software</InputLabel>
                  <Select
                    labelId="software-label"
                    id="software"
                    name="software"
                    label="software"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.software}
                    error={
                      formik.touched.software && Boolean(formik.errors.software)
                    }
                  >
                    {software.map((software) => (
                      <MenuItem key={software} value={software}>
                        {software}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  id="other"
                  name="other"
                  label="Other"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.other}
                  error={formik.touched.other && Boolean(formik.errors.other)}
                  helperText={formik.touched.other && formik.errors.other}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="additionalInformtion"
                  name="additionalInformtion"
                  label="Additional Informtion"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.additionalInformtion}
                  error={
                    formik.touched.additionalInformtion &&
                    Boolean(formik.errors.additionalInformtion)
                  }
                  helperText={
                    formik.touched.additionalInformtion &&
                    formik.errors.additionalInformtion
                  }
                  margin="normal"
                />
              </>
            )}

            {index === 3 && (
              <>
          
                <Typography ><strong>First Name:</strong> {formValues.firstName}</Typography>
                <Typography><strong>Middle Name:</strong> {formValues.middleName}</Typography>
                <Typography><strong>Last Name:</strong> {formValues.lastName}</Typography>
                <Typography><strong>Phone Number:</strong> {formValues.phoneNumber}</Typography>
                <Typography><strong>email:</strong> {formValues.email}</Typography>
                <Typography><strong>Other Phone Number:</strong> {formValues.otherPhoneNumber}</Typography>
                
                <Typography><strong>IMEI:</strong> {formValues.imei}</Typography>
                <Typography><strong>Device Model:</strong> {formValues.model}</Typography>
                <Typography><strong>Device Make:</strong> {formValues.deviceMake}</Typography>
                <Typography><strong>Date Of Purchase:</strong> {formValues.dateOfPurchase}</Typography>
                <Typography><strong>Place Of Purchase:</strong> {formValues.placeOfPurchase}</Typography>
                <Typography><strong>Warranty Status:</strong> {formValues.warrantyStatus}</Typography>

                <Typography><strong>Display:</strong> {formValues.display}</Typography>
                <Typography><strong>Power:</strong> {formValues.power}</Typography>
                <Typography><strong>Sound:</strong> {formValues.sound}</Typography>
                <Typography><strong>Software:</strong> {formValues.software}</Typography>
                <Typography><strong>Other:</strong> {formValues.other}</Typography>
                <Typography><strong>Additional Information:</strong> {formValues.additionalInformtion}</Typography>
                
                {/* ... Display other captured values */}
                
              </>
            )}

            <div>
              {index > 0 && (
                <Button type="button" onClick={prevStep} variant="contained">
                  Previous
                </Button>
              )}
              {index < steps.length - 1 && (
                <Button
                  onClick={() => {
                    nextStep();
                    updateFormValues(formik.values);
                  }}
                  variant="contained"
                >
                  Next
                </Button>
              )}
              {index === steps.length - 1 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default Form1;
