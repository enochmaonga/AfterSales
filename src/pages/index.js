import React from "react";
import Home from "@/components/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/Layout";

function HomePage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title> Joscare | Home</title>
      </Head>
      <Layout />
      <Home />
    </>
  );
}

export default HomePage;
