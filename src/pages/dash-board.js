import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import PageLayout from "@/components/MainLayout/PageLayout";



function Dashboard() {
  return (
    <>
      <Head>
        <title> Joscare | DashBoard</title>
      </Head>
      <div>
        <Layout />
        <PageLayout />
      </div>
    </>
  );
}

export default Dashboard;

