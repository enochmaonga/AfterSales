import React from 'react';
import { Container } from '@mui/material';
import Customer from '@/components/Container/Customer';
import Head from 'next/head';

const Customer1 = () => {
  return (
    <>
    <Head>
      <title> Joscare | Customer</title>
    </Head>
    <Container maxWidth="lg">
      <Customer />
    </Container>

    </>
  );
};

export default Customer1;