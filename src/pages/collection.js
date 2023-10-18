import React from "react";
import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import Layout from "@/components/Layout";
import PageLayout from "@/components/MainLayout/PageLayout";

const Collection = () => {
  return (
    <>
    <Head>
      <title> Joscare | Collection</title>
    </Head>
    <div>
    <Layout />
        <PageLayout />
       
      </div>
    </>
  );
};

export default Collection;