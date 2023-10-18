import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Typography,
} from "@mui/material";

const Finance = () => {
  // Sample data
  const data = [
    {
      customerName: "John Doe",
      phoneNumber: "123-456-7890",
      phoneModel: "iPhone 12",
      sparePartUsed: "Battery",
      price: 50,
    },
    // Add more data as needed
  ];

  // Calculate total
  const total = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <TableContainer maxWidth="xl">
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "left",
          mt: 2,
          mb: 4,
          color: "#a1887f",
        }}
      >
        Cash Collection
      </Typography>
      <Card sx={{width: "90%", mt: 16, ml: "2%"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Phone Model</TableCell>
              <TableCell>Spare Part Used</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.phoneModel}</TableCell>
                <TableCell>{row.sparePartUsed}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Total:
              </TableCell>
              <TableCell>{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </Card>
     <Card>
        
        </Card>
    </TableContainer>
  );
};

export default Finance;
