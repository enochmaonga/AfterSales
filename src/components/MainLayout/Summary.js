import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import NextLink from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { SERVER_URL } from "@/config";
// import InputAdornment from '@material-ui/core/InputAdornment';

const customersData = [
  {
    id: 1,
    customerName: "John Doe",
    phoneNumber: "0773 764-309",
    phoneModel: "iPhone 12",
    imei: "123456789012345",
    createdDate: new Date("2023-11-18T08:00:00"),
  },
  {
    id: 2,
    customerName: "Jane Smith",
    phoneNumber: "0721 654-564",
    phoneModel: "Samsung Galaxy S21",
    imei: "987654321098765",
    createdDate: new Date("2023-11-18T08:00:00"),
  },
  {
    id: 3,
    customerName: "Andrew Jj",
    phoneNumber: "0723 654-321",
    phoneModel: "Samsung Galaxy A10",
    imei: "987654321786543",
    createdDate: new Date("2023-11-18T08:00:00"),
  },
  {
    id: 3,
    customerName: "Andrew Jj",
    phoneNumber: "0723 654-321",
    phoneModel: "Samsung Galaxy A10",
    imei: "987654321786543",
    createdDate: new Date("2023-11-18T08:00:00"),
  },
];

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});

function Summary() {
  const [bookeditems, setBookeditems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from the server...");
        const response = await fetch(`${SERVER_URL}/booked`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Server response status:", response.status);

        if (response.status === 200) {
          const responseData = await response.json();
          console.log("Response data from the server:", responseData);

          if (Array.isArray(responseData.body)) {
            if (responseData.body.length > 0) {
              const updatedBookedItems = responseData.body.map((item) => ({
                id: item.id,
                customerName: `${item.firstName} ${item.middleName} ${item.lastName}`,
                phoneNumber: item.phoneNumber,
                otherPhoneNumber: item.otherPhoneNumber,
                deviceMake: item.deviceMake,
                phoneModel: item.model,
                model: item.model,
                imei: item.imei,
                duration: calculateDuration(item.dateOfPurchase),
              }));
              setBookeditems(updatedBookedItems);
            } else {
              console.log("No data received from the server");
            }
          } else {
            console.error(
              "Data from the server is not an array:",
              responseData.body
            );
          }
        } else {
          console.error("Server error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const calculateDuration = (dateOfPurchase) => {
    const currentDate = new Date();
    const differenceInDays = Math.floor(
      (currentDate - new Date(dateOfPurchase)) / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days`;
  };

  return (
    <>
      <Grid container>
        <Grid item sx={{ ml: "30%", mt: 5, color: "#90caf9" }}>
          <Typography variant="h4">Welcome to Service Center Home</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={8} md={9} xl={10}>
          <form>
            <TextField
              id="search-bar"
              className="text"
              label="search"
              variant="outlined"
              placeholder="Enter customer Phone number..."
              sx={{ minWidth: "90%" }}
              // onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ fill: "blue" }} />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={4} md={3} xl={2}>
          <NextLink href="/device_booking">
            <Button variant="contained">
              <Typography>Book phone</Typography>
            </Button>
          </NextLink>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              <BoldTableCell>Customer Name</BoldTableCell>
              <BoldTableCell>Phone Number</BoldTableCell>
              <BoldTableCell>Other Phone Number</BoldTableCell>
              <BoldTableCell>Device Make</BoldTableCell>
              <BoldTableCell>Model</BoldTableCell>
              <BoldTableCell>IMEI</BoldTableCell>
              <BoldTableCell>Duration</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookeditems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.otherPhoneNumber}</TableCell>
                <TableCell>{item.deviceMake}</TableCell>
                <TableCell>{item.model}</TableCell>
    
                <TableCell>{item.imei}</TableCell>
            
                <TableCell>{item.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Summary;
