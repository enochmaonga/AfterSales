import React, { useState } from 'react';
import { useRouter } from "next/router";
import BookingFormStep1 from './BookingFormStep1';
import BookingFormStep2 from './BookingFormStep2';
import BookingFormStep3 from './BookingFormStep3';


function BookingPage() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleBackStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (values, {setSubmitting}) => {
    setFormValues({ ...formValues, ...values });

    if (step === 3) {
      // Handle the final submission here, for now, we just log the data
      console.log("Form Submitted:", values);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep -1)
    }
  };

  let stepComponents = [
    <BookingForm initialValues={formValues} onSubmit={handleSubmit} />,
    <BookingFormStep2 initialValues={formValues} onSubmit={handleSubmit} onBack={handleBack} />,
    <BookingFormStep3 initialValues={formValues} onSubmit={handleSubmit} />,
  ];

  // switch (step) {
  //   case 1:
  //     stepComponent = <BookingForm initialValues={formValues} onSubmit={handleSubmit} />
  //     break;
  //     case 2:
  //       stepComponent = <BookingFormStep2 initialValues={formValues} onSubmit={handleSubmit} onBack={handleBack} />
  //       break;
  //       case 3:
  //       stepComponent = <><BookingFormStep3 initialValues={formValues} /><Button>onSubmit={handleSubmit}</Button></>
  //       break;
  //       default:
  //         stepComponent = null;

  // }

  return (
    <div>
      <h1>Customer Details {step}</h1>
      {stepComponents[step -1]}
    </div>
  );
};

export default BookingPage;