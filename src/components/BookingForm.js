import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("Middle name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),
  alternativePhoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Alternative phone number is required"),
});

function BookingForm({ initialValues, formValues, sections }) {
  const [step, setStep] = useState(1);
  const [capturedValues, setCapturedValues] = useState({});

  const handlePrint = () => {
    window.print();
  };

  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 4) {
      setStep(newStep);
    }
  };

  const handleNextStep = (values) => {
    if (step === 3) {
      setCapturedValues({ ...capturedValues, ...values });
      handleStepChange(step + 1);
    } else if (step < 3) {
      setTimeout(() => {
        handleStepChange(step + 1);
      }, 500);
    }
  };

  const handleSubmit = (values) => {
    //perfom submission logic
    console.log("Form Submitted:", values);
  };
  const steps = [
    BookingFormStep1,
    BookingFormStep2,
    BookingFormStep3,
    BookingFormSummary,
  ];

  const CurrentStep = steps[step - 1];

 

  return (
    <Formik
      initialValues={formValues}
      onSubmit={(values, { setSubmitting }) => {
        if (step === 4) {
          handleSubmit(values);
        } else {
          handleNextStep(values);
        }
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Card sx={{ minHeight: "50vh", borderRadius: 5, mt: 5 }}>
          <Form>
            <CurrentStep
              formValues={formValues}
              onNextStep={handleNextStep}
              step={step}
              capturedValues={capturedValues}
              handlePrint={handlePrint}
            />

            {step === 4 && (
              <Box sx={{ padding: 5 }}>
                {sections &&
                  sections.map((section, index) => (
                    <div key={index}>
                      <Typography variant="subtitle1">
                        {section.title}:
                      </Typography>
                      {sections &&
                        section.fields.map((field) => (
                          <Typography key={field}>
                            {field}: {capturedValues[field]}
                            
                          </Typography>
                        ))}
                    </div>
                  ))}
              </Box>
            )}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: "10vh" }}
            >
              <Grid item xs={12} sm={6} md={4} xl={3}>
                {step === 1 && (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ borderRadius: 3, width: "100%" }}
                    onClick={() => handleStepChange(step + 1)}
                  >
                    Next
                  </Button>
                )}

                {step === 2 && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="button"
                      sx={{ borderRadius: 3, flex: 1, mr: 2 }}
                      onClick={() => handleStepChange(step - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ borderRadius: 3, flex: 1 }}
                      onClick={() => handleStepChange(step + 1)}
                    >
                      Next
                    </Button>
                  </Box>
                )}

                {step === 3 && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="button"
                      sx={{ borderRadius: 3, flex: 1, mr: 2 }}
                      onClick={() => handleStepChange(step - 1)}
                    >
                      previous
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ borderRadius: 3, flex: 1 }}
                      onClick={() => handleStepChange(step + 1)}
                    >
                      Next
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Form>
        </Card>
      )}
    </Formik>
  );
}

const BookingFormStep1 = ({ initialValues, step }) => {
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5">Personal Information</Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: 5 }}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="middleName"
            name="middleName"
            label="Middle Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <TextField
            id="alternativePhoneNumber"
            name="alternativePhoneNumber"
            label="Alternative Phone Number"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Form>
  );
};

const BookingFormStep2 = ({ initialValues, step }) => {
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5">Device Information</Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: 5 }}>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="imei"
            name="imei"
            label="IMEI/Serial"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="deviceMake"
            name="deviceMake"
            label="Device Make"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="deviceModel"
            name="deviceModel"
            label="Device Model"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="dateOfPurchase"
            name="dateOfPurchase"
            label="Date Of Purchase"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="placeOfPurchase"
            name="placeOfPurchase"
            label="Place Of Purchase"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <TextField
            id="warrantyStatus"
            name="warrantyStatus"
            label="Warranty Status"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Form>
  );
};

const BookingFormStep3 = ({ initialValues, step }) => {
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5">Device Faults</Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: 5 }}>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="display">Display</InputLabel>
          <Select
            required
            labelId="display"
            id="display"
            label="Display"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="crackedScreen">Cracked Screen </MenuItem>
            <MenuItem value="noDisplay">No Display</MenuItem>
            <MenuItem value="displaysLines">Displays Lines</MenuItem>
            <MenuItem value="invertedDisplay">Inverted Display</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="n/a">N/A</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="power">Power</InputLabel>
          <Select
            required
            InputLabel="power"
            id="power"
            label="Power"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="doesNotPower">Does not Power</MenuItem>
            <MenuItem value="powerButtonNotWorking">
              Power Button not working
            </MenuItem>
            <MenuItem value="notCharging">Not charging</MenuItem>
            <MenuItem value="shortBatteryLife">Short Battery Life</MenuItem>
            <MenuItem value="swollenBattery">Swollen Battery</MenuItem>
            <MenuItem value="n/a">N/A</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="sound">Sound</InputLabel>
          <Select
            required
            InputLabel="sound"
            id="sound"
            label="Sound"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="noSound">No sound</MenuItem>
            <MenuItem value="crackingSound">Cracking Sound</MenuItem>
            <MenuItem value="worksOnlyOnLoudspeaker">
              Works only on Loudspeaker
            </MenuItem>
            <MenuItem value="volumeVeryLow">Volume very low</MenuItem>
            <MenuItem value="n/a">N/A</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="software-label">Software</InputLabel>
          <Select
            required
            labelId="software-label"
            id="software"
            label="Software"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="GoesOnAndOff">Goes on and off</MenuItem>
            <MenuItem value="softwareUpdate">Software update</MenuItem>
            <MenuItem value="n/a">N/A</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="other">Other</InputLabel>
          <TextField required id="other" label="Other" fullWidth />
        </Grid>
        <Grid item xs={12} sm={10} md={8} xl={4}>
          <InputLabel id="additional-info">Additional Info</InputLabel>
          <TextField
            required
            id="additionalInformation"
            label="Additional Information"
            fullWidth
          />
        </Grid>
      </Grid>
    </Form>
  );
};
const BookingFormSummary = ({ formValues, capturedValues, handlePrint }) => {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        "firstName",
        "middleName",
        "lastName",
        "email",
        "phoneNumber",
        "alternativePhoneNumber",
      ],
    },
    {
      title: "Device Information",
      fields: [
        "imei",
        "deviceMake",
        "deviceModel",
        "dateOfPurchase",
        "placeOfPurchase",
        "warrantyStatus",
      ],
    },
    {
      title: "Device Faults",
      fields: [
        "display",
        "power",
        "sound",
        "software",
        "other",
        "additionalInformation",
      ],
    },
    // Add more sections here if needed
  ];

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5">Summary</Typography>
      {sections.map((section, index) => (
        <div key={index}>
          <Typography variant="subtitle1">{section.title}:</Typography>
          {section.fields.map((field) => (
            <Typography key={field}>
              {field}: {capturedValues && capturedValues[field]}
            </Typography>
          ))}
        </div>
      ))}
      <Grid container spacing={2} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" sx={{ borderRadius: 3 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
