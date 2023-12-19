import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageContainer from "../PageContainer";
import PageSection from "../PageSection";
import NextLink from "next/link";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  deviceMake: Yup.string().required("Phone Make is required"),
  phoneModel: Yup.string().required("Phone Model is required"),
  imei: Yup.string().required("IMEI is required"),
  faults: Yup.string().required("Faults is required"),
  duration: Yup.string().required("Duration is required"),
  comments: Yup.string(),
  spareUsed: Yup.string(),
});

function ServiceCard() {
  const router = useRouter();
  const { imei, ...customer } = router.query; // Get the customer information from query

  useEffect(() => {
    // Any additional logic you might have here
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    router.push("/customer");
  };

  return (
    <PageSection>
      <PageContainer>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            xl={3}
            sx={{ ml: "40%", color: "#90caf9" }}
          >
            <Typography variant="h5">Phone Repair Details</Typography>
          </Grid>
        </Grid>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Formik
              initialValues={{
                customerName: customer.customerName || "",
                phoneNumber: customer.phoneNumber || "",
                deviceMake: customer.deviceMake || "",
                phoneModel: customer.phoneModel || "",
                imei: customer.imei || "",
                faults: customer.faults || "",
                duration: customer.duration || "",
                comments: "",
                spareUsed: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Customer Name:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="customerName"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="customerName" component="div" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Phone Number:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="phoneNumber"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="phoneNumber" component="div" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Phone Make:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="deviceMake"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="deviceMake" component="div" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Phone Model:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="phoneModel"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="phoneModel" component="div" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Faults:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="faults"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="faults" component="div" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Duration:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="duration"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="duration" component="div" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>IMEI:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        type="text"
                        name="imei"
                        disabled
                        value={values.imei}
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="imei" component="div" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Comments:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        as="textarea"
                        name="comments"
                        style={{ width: "70%", height: "40px" }}
                      />
                      <ErrorMessage name="comments" component="div" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      style={{ textAlign: "center" }}
                    >
                      <label>Spare Part Used:</label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} xl={9}>
                      <Field
                        as="select"
                        name="spareUsed"
                        style={{ width: "70%", height: "40px" }}
                      >
                        <option value="">Select a spare part</option>
                        <option value="spare1">Screen</option>
                        <option value="spare2">Battery</option>
                        <option value="spare3">Touch</option>
                        <option value="spare4">Power Button</option>
                        {/* Add more spare parts as needed */}
                      </Field>
                      <ErrorMessage name="spareUsed" component="div" />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ borderRadius: 5, mt: 5 }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <NextLink href="/repairs" passHref>
                        <Button
                          type="button"
                          variant="contained"
                          sx={{
                            borderRadius: 5,
                            mt: 5,
                            backgroundColor: "red",
                          }}
                        >
                          Cancel
                        </Button>
                      </NextLink>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </PageContainer>
    </PageSection>
  );
}

export default ServiceCard;
