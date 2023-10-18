import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const customersData = [
  {
    id: 1,
    customerName: "John Doe",
    phoneNumber: "0773 764-309",
    phoneMake: "iPhone",
    phoneModel: "12 Pro",
    imei: "123456789012345",
    faults: "Does not power",
    duration: "2 days",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    phoneNumber: "0721 654-564",
    phoneMake: "Samsung Galaxy",
    phoneModel: " S21",
    imei: "987654321098765",
    faults: "Does not power",
    duration: "8 days",
  },
  {
    id: 3,
    customerName: "Andrew Mondo",
    phoneNumber: "0723 654-321",
    phoneMake: "Samsung Galaxy",
    phoneModel: "A10",
    imei: "987654321786543",
    faults: "Broken screen",
    duration: "5 days",
  },
  {
    id: 3,
    customerName: "Jackson Alex J",
    phoneNumber: "0723 654-321",
    phoneMake: "Oppo",
    phoneModel: "A9 2020",
    imei: "987654321786543",
    faults: "Forgot Passcode",
    duration: "5 days",
  },
];

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});

const ColoredTableCell = styled(TableCell)({
  backgroundColor: "#f0f0f0",
});

const StyledNextLink = styled(NextLink)`
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display inline with other items */
  
`;

function BookedTable() {
  const [repairComments, setRepairComments] = useState({});
  const router = useRouter();

  const handleRepairCommentsChange = (imei, comments) => {
    setRepairComments((prevComments) => ({
      ...prevComments,
      [imei]: comments,
    }));
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="customer table">
          <TableHead>
            <TableRow>
              <BoldTableCell>Customer Name</BoldTableCell>
              <BoldTableCell>Phone Number</BoldTableCell>
              <BoldTableCell>Phone Make</BoldTableCell>
              <BoldTableCell>Phone Model</BoldTableCell>
              <BoldTableCell>IMEI</BoldTableCell>
              <BoldTableCell>Faults</BoldTableCell>
              <BoldTableCell>Duration</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.phoneMake}</TableCell>
                <TableCell>{customer.phoneModel}</TableCell>
                <TableCell>
                <StyledNextLink
                    href={{
                      pathname: "/service-form",
                      query: { imei: customer.imei, ...customer },
                    }}
                    passHref
                  >
                    {customer.imei}
                  </StyledNextLink>
                  </TableCell>
                <TableCell>{customer.faults}</TableCell>
                <TableCell>{customer.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default BookedTable;
