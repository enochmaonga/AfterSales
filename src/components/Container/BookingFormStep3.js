import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Grid, TextField } from "@mui/material";

const validationSchema = Yup.object().shape({
  
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("This name is required"),
  lastName: Yup.string().required("This name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),
    otherPhoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),
});

const BookingFormStep3 = ({ initialValues, onSubmit, onBack }) => {
  return (
    <><h1>Customer Details-3 {step}</h1>
    <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
      >
          {({ isSubmitting }) => (
              <Card sx={{ minHeight: "50vh", borderRadius: 5 }}>
                  <Form>
                      <Grid container spacing={2} sx={{ padding: 5 }}>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField id="AlphasName" label="AlphasName" variant="outlined" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField required id="middleName" label="Middle Name" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField required id="lastName" label="Last Name" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField required id="email" label="Email" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField required id="phoneNumber" label="Phone Number" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={10} md={8} xl={4}>
                              <TextField required id="alternativePhoneNumber" label="Other Phone Number" fullWidth />
                          </Grid>
                      </Grid>
                      <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          style={{ height: "10vh" }}
                      >
                          <Button variant="contained" sx={{ borderRadius: 3 }}>
                              Next
                          </Button>
                      </Grid>
                  </Form>
              </Card>
          )}
      </Formik></>
  );
};

export default BookingFormStep3;