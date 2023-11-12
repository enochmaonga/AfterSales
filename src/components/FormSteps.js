import React from "react";
import { Formik, Field, Form } from "formik";
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  otherPhoneNumber: "",
  imei: "",
  deviceMake: "",
  deviceModel: "",
  purchaseDate: "",
  placeOfPurchase: "",
  warrantyStatus: "",
  display: "",
  power: "",
  sound: "",
  software: "",
  other: "",
  additional: "",
};

const steps = ["Customer Details", "Phone Details", "Fault Details", "Summary"];

const FormStep = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({});

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Update state with form values
    setFormValues(values);
    // Handle form submission logic here (e.g., submit to the database)
    console.log("Submitted values:", values);
    setSubmitting(false);
  };

  return (
    <div>
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
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
                    <Field
                      as={TextField}
                      type="text"
                      name="firstName"
                      label="First Name"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="middleName"
                      label="Middle Name"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="lastName"
                      label="Last Name"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="phoneNumber"
                      label="Phone Number"
                    />
                    <Field
                      as={TextField}
                      type="email"
                      name="email"
                      label="Email"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="otherPhoneNumber"
                      label="Other Phone Number"
                    />
                  </>
                )}
                {index === 1 && (
                  <>
                    <Field
                      as={TextField}
                      type="text"
                      name="imei"
                      label="IMEI"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="deviceMake"
                      label="Device Make"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="deviceModel"
                      label="Device Model"
                    />
                    <Field
                      as={TextField}
                      type="date"
                      name="purchaseDate"
                      label="Date of Purchase"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="placeOfPurchase"
                      label="Place of Purchase"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="warrantyStatus"
                      label="Warranty Status"
                    />
                  </>
                )}
                {index === 2 && (
                  <>
                    <InputLabel id="display">Display</InputLabel>
                    <Select
                      required
                      labelId="display"
                      id="display"
                      name="display"
                      label="Display"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="Cracked Screen">Cracked Screen</MenuItem>
                      <MenuItem value="No Display">No Display</MenuItem>
                      <MenuItem value="Displays Lines">Displays Lines</MenuItem>
                      <MenuItem value=" Inverted Display">
                        Inverted Display
                      </MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="n/a">N/A</MenuItem>
                    </Select>

                    <InputLabel id="power">Power</InputLabel>
                    <Select
                      required
                      labelId="power"
                      id="power"
                      name="power"
                      label="power"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="does not power">Does not Power</MenuItem>
                      <MenuItem value="does not charge">
                        Does not Charge
                      </MenuItem>
                      <MenuItem value="shortBatteryLife">
                        Short Battery Life
                      </MenuItem>
                      <MenuItem value="swollenBattery">
                        Swollen Battery
                      </MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="n/a">N/A</MenuItem>
                    </Select>

                    <InputLabel id="sound">Sound</InputLabel>
                    <Select
                      required
                      labelId="sound"
                      id="sound"
                      name="sound"
                      label="sound"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="noSound">No Sound</MenuItem>
                      <MenuItem value="crackingSound">Cracking Sound</MenuItem>
                      <MenuItem value="worksOnlyOnLoudspeaker">
                        Works Only OnLoudspeaker
                      </MenuItem>
                      <MenuItem value="volumeVeryLow">Volume VeryLow</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="n/a">N/A</MenuItem>
                    </Select>
                    <InputLabel id="software">Software</InputLabel>
                    <Select
                      required
                      labelId="software"
                      id="software"
                      name="software"
                      label="software"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="goesOnAndOff">Goes On And Off</MenuItem>
                      <MenuItem value="softwareUpdate">
                        Software Update
                      </MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="n/a">N/A</MenuItem>
                    </Select>
                    <InputLabel id="other">Other</InputLabel>
                    <Select
                      required
                      labelId="other"
                      id="other"
                      name="other"
                      label="other"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="other">Other</MenuItem>
                    </Select>

                    <InputLabel id="Additional Information">
                      Additional Information
                    </InputLabel>
                    <TextField
                      required
                      labelId="additional"
                      id="additional"
                      name="additional"
                      label="Additional Information"
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}
                {index === 3 && (
                  <>
                    {/* Display summary of entered details */}
                    <Typography variant="body1">
                      <strong>Customer Details:</strong>
                      <br />
                      {values.firstName} {values.middleName} {values.lastName}
                      <br />
                      Phone Number: {values.phoneNumber}
                      <br />
                      Email: {values.email}
                      <br />
                      Other Phone Number: {values.otherPhoneNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Phone Details:</strong>
                      <br />
                      IMEI: {values.imei}
                      <br />
                      Device Make: {values.deviceMake}
                      <br />
                      Device Model: {values.deviceModel}
                      <br />
                      Purchase Date: {values.purchaseDate}
                      <br />
                      Place of Purchase: {values.placeOfPurchase}
                      <br />
                      Warranty Status: {values.warrantyStatus}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Fault Details:</strong>
                      <br />
                      Display: {values.display}
                      <br />
                      Power: {values.power}
                      <br />
                      Sound: {values.sound}
                      <br />
                      Software: {values.software}
                      <br />
                      Other: {values.other}
                      <br />
                      Additional Information: {values.additional}
                    </Typography>
                  </>
                )}
                <div>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="contained"
                    >
                      Previous
                    </Button>
                  )}
                  {index < steps.length - 1 && (
                    <Button
                      type="button"
                      onClick={nextStep}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  )}
                  {index === steps.length - 1 && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormStep;
