import React from 'react';
import { Container, Typography } from '@mui/material';
import JoscareMainLayout from '../MainLayout';
import Layout from '../Layout';
import Summary from '../MainLayout/Summary';

const Customer = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        <Layout />
        <JoscareMainLayout />
        <Summary />
      </Typography>
    </Container>
  );
};

export default Customer;