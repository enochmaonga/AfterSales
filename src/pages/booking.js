import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import BookingForm from "@/components/BookingForm";
import Layout from "@/components/Layout";
import PageContainer from "@/components/PageContainer";
import PageSection from "@/components/PageSection";

function Booking() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/booking-step2");
  };
  return (
    <>
      <Head>
        <title> Joscare | Booking</title>
      </Head>
      <Layout />
      <PageSection>
        <PageContainer>
          <BookingForm handleNext={handleNext} />
        </PageContainer>
      </PageSection>
    </>
  );
}

export default Booking;
