import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import PageLayout from "@/components/MainLayout/PageLayout";
import Users from "@/components/Dashboard/Users";



function UserManagement() {
  return (
    <>
      <Head>
        <title> Joscare | Users</title>
      </Head>
      <div>
        <Layout />
        <PageLayout />
        <Users />
      </div>
    </>
  );
}

export default UserManagement;

