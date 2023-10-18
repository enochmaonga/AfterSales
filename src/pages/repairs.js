import React from 'react';
import PhoneCard from '../components/RepairManagement/PhoneCard';
import { Container } from '@mui/material';
import Layout from '@/components/Layout';
import Head from 'next/head';
import PageSection from '@/components/PageSection';
import PageContainer from '@/components/PageContainer';

const HomePage = () => {
  return (
    <><Head>
          <title> Joscare | Repairs</title>
      </Head>
      <Layout />
      <PageSection>
        <PageContainer>
          <PhoneCard />
        </PageContainer>
      </PageSection>
    </>
         
  );
};

export default HomePage;