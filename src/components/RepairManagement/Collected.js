import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const customersData = [
  {
    id: 1,
    customerName: "John Doe",
    phoneNumber: "0773 764-309",
    phoneMake: "iPhone",
    phoneModel: "12 Pro",
    imei: "123456789012345",
    faults: "Does not power",
    comments: "Software updated",
    dateCollected: "closedRecord",
    collectedBy: "pickedBy",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    phoneNumber: "0721 654-564",
    phoneMake: "Samsung Galaxy",
    phoneModel: " S21",
    imei: "987654321098765",
    faults: "Does not power",
    comments: "Power Button Replaced",
    dateCollected: "closedRecord",
    collectedBy: "pickedBy",
  },
  {
    id: 3,
    customerName: "Andrew Mondo",
    phoneNumber: "0723 654-321",
    phoneMake: "Samsung Galaxy",
    phoneModel: "A10",
    imei: "987654321786543",
    faults: "Broken screen",
    comments: "Screen replaced",
    dateCollected: "closedRecord",
    collectedBy: "pickedBy",
  },
  {
    id: 3,
    customerName: "Jackson Alex J",
    phoneNumber: "0723 654-321",
    phoneMake: "Oppo",
    phoneModel: "A9 2020",
    imei: "987654321786543",
    faults: "Forgot Passcode",
    comments: "Software updated",
    dateCollected: "closedRecord",
    collectedBy: "pickedBy",
  },
];

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});

const ColoredTableCell = styled(TableCell)({
  backgroundColor: "#f0f0f0",
});

function Collected() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [pickedUpRecords, setPickedUpRecords] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pickedBy, setPickedBy] = useState("");
  const [closedRecord, setClosedRecord] = useState(false);

  const handleOpenDialog = (customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePickUp = () => {
    if (pickedBy.trim() === "") {
    } else {
      // Update the selected customer's customerPickup value to "closed Records"
      const updatedCustomer = {
        ...selectedCustomer,
        customerPickUp: "closed Records",
      };
      setSelectedCustomer(updatedCustomer);
      // Open the confirm dialog
      setConfirmDialogOpen(true);
      // Close the dialog
      setOpenDialog(false);
    }
  };

  const handleCloseConfirmDialog = (confirmed) => {
    // Close the confirmation dialog
    setConfirmDialogOpen(false);
    //set the closedRecord state true
    if (confirmed) {
      // Set the closedRecord state true and open the success dialog
      setClosedRecord(true);
    }
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

              <BoldTableCell>Comments</BoldTableCell>
              <BoldTableCell>Date Collected</BoldTableCell>
              <BoldTableCell>Picked By</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.phoneMake}</TableCell>
                <TableCell>{customer.phoneModel}</TableCell>
                <TableCell>{customer.imei}</TableCell>
                <TableCell>{customer.faults}</TableCell>

                <TableCell>{customer.comments}</TableCell>
                <TableCell>{customer.dateCollected}</TableCell>
                <TableCell>{customer.pickedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Customer Pick-up Details</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <>
              <TextField
                label="Customer Name"
                value={selectedCustomer.customerName}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Make"
                value={selectedCustomer.phoneMake}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Number"
                value={selectedCustomer.phoneNumber}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Make"
                value={selectedCustomer.phoneMake}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Phone Model"
                value={selectedCustomer.phoneModel}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="IMEI"
                value={selectedCustomer.imei}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Comments"
                value={selectedCustomer.comments}
                fullWidth
                style={{ marginTop: 12 }}
              />
              <TextField
                label="Picked By"
                fullWidth
                style={{ marginTop: 12 }}
                value={pickedBy}
                onChange={(e) => setPickedBy(e.target.value)}
                required // Add this attribute to make it required
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              textTransform: "none",
              borderRadius: 5,
              backgroundColor: "red",
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handlePickUp}
            color="primary"
            sx={{ textTransform: "none", borderRadius: 5 }}
          >
            Mark as Picked Up
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogContent>
          <Box style={{ textAlign: "center" }}>
            <ErrorIcon style={{ color: "red", fontSize: 60 }} />
          </Box>
          <Typography>Are you sure you want to close this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Button
                variant="contained"
                onClick={() => handleCloseConfirmDialog(false)}
                sx={{
                  textTransform: "none",
                  borderRadius: 5,
                  backgroundColor: "red",
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Button
                variant="contained"
                onClick={() => handleCloseConfirmDialog(true)}
                color="primary"
                sx={{ textTransform: "none", borderRadius: 5 }}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Success Dialog */}
      {closedRecord && (
        <Dialog open={closedRecord} onClose={() => setClosedRecord(false)}>
          <DialogContent>
            <Box style={{ textAlign: "center" }}>
              <CheckCircleIcon style={{ color: "#6200ea", fontSize: 60 }} />
            </Box>
            <Typography>You have successfully closed the record.</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => setClosedRecord(false)}
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: 5,
                color: "white",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
export default Collected;
