import React from "react";
import { Container, Typography } from "@mui/material";
import Inventory from "@/components/Spares/Inventory";
import Layout from "@/components/Layout";
import Head from "next/head";

const inventoryData = [
  {
    itemCode: "001",
    itemName: "Spare Part 1",
    qty: 10,
    unitPrice: 20,
    value: 2000,
  },
  {
    itemCode: "002",
    itemName: "Spare Part 2",
    qty: 15,
    unitPrice: 30,
    value: 4500,
  },
  {
    itemCode: "003",
    itemName: "Spare Part 3",
    qty: 15,
    unitPrice: 30,
    value: 4500,
  },
  {
    itemCode: "004",
    itemName: "Spare Part 4",
    qty: 15,
    unitPrice: 30,
    value: 4500,
  },
  {
    itemCode: "005",
    itemName: "Spare Part 5",
    qty: 15,
    unitPrice: 30,
    value: 4500,
  },
];

const InventoryPage = () => {
  return (
    <>
    <Head>
          <title> Joscare | Spares</title>
      </Head>
      <Layout />

      <Inventory data={inventoryData} />
    </>
  );
};

export default InventoryPage;
