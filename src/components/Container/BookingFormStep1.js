import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";


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

const BookingFormStep1 = ({ initialValues }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, 
        { setSubmitting }) => {
        if (step === 1) {
          handleNextStep();
        } else {
          // Perform submission logic here
          console.log("Form submitted:", values);
        }
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Card sx={{ minHeight: "50vh", borderRadius: 5 }}>
          <Form>
            <Grid container spacing={2} sx={{ padding: 5 }}>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} xl={4}>
                <TextField
                  id="alternativePhoneNumber"
                  name="alternativePhoneNumber"
                  label="Alternative Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ height: "10vh" }}
            >
              {step === 1 && (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: 3 }}
                  onClick={() => router.push("/booking-step2")}
                >
                  Next
                </Button>
              )}
              {step === 2 && (
                <Button
                  variant="contained"
                  type="button"
                  sx={{ borderRadius: 3 }}
                  onClick={() => router.push("/booking-step2")}
                >
                  Next
                </Button>
              )}
            </Grid>
          </Form>
        </Card>
      )}
    </Formik>
  );
};

export default BookingFormStep1;
