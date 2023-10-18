import React from "react";
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
// import InputAdornment from '@material-ui/core/InputAdornment';

const customersData = [
  {
    id: 1,
    customerName: "John Doe",
    phoneNumber: "0773 764-309",
    phoneModel: "iPhone 12",
    imei: "123456789012345",
    duration: "2 days",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    phoneNumber: "0721 654-564",
    phoneModel: "Samsung Galaxy S21",
    imei: "987654321098765",
    duration: "8 days",
  },
  {
    id: 3,
    customerName: "Andrew Jj",
    phoneNumber: "0723 654-321",
    phoneModel: "Samsung Galaxy A10",
    imei: "987654321786543",
    duration: "5 days",
  },
  {
    id: 3,
    customerName: "Andrew Jj",
    phoneNumber: "0723 654-321",
    phoneModel: "Samsung Galaxy A10",
    imei: "987654321786543",
    duration: "5 days",
  },
];

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});



function Summary() {
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
          <NextLink href="/booking">
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
              <BoldTableCell>Phone Model</BoldTableCell>
              <BoldTableCell>IMEI</BoldTableCell>
              <BoldTableCell>Duration</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.phoneModel}</TableCell>
                <TableCell>{customer.imei}</TableCell>
                <TableCell>{customer.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Summary;
