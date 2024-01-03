import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from "../PageContainer";
import PageSection from "../PageSection";
import SparePartDialog from "./SparePartDialog";
import ReceiveSparesDialog from "./ReceiveSparesDialog";
import { SERVER_URL } from "@/config";

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false); // Create dialog state
  const [isReceiveDialogOpen, setReceiveDialogOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setFilteredData(inventory);
    }
  };

  const handleSearchButtonClick = () => {
    const filteredItems = inventory.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from the server...");
        const response = await fetch(`${SERVER_URL}/sparesInventory`, {
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
              const fetchedItems = responseData.body.map((item) => ({
                itemCode: item.itemCode,
                itemName: item.itemName,
                qty: item.qty,
                unitPrice: item.unitPrice,
        
              }));
              setFilteredData(fetchedItems);
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


  // Calculate total units and total value
  const totalUnits = filteredData.reduce((total, item) => total + item.qty, 0);
  const totalValue = filteredData.reduce(
    (total, item) => total + item.qty * item.unitPrice,
    0
  );

  const handleOpenDialog = () => {
    setDialogOpen(true);
  
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
   
  };
  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleOpenReceiveDialog = () => {
    setReceiveDialogOpen(true);
  };

  const handleCloseReceiveDialog = () => {
    setReceiveDialogOpen(false);
  };
  const handleSaveSparePart = (formData) => {
    // Save the spare part data to your inventory state or perform an API request here.
    setInventory([...inventory, formData]);
  };

  return (
    <PageSection>
      <PageContainer>
        <Grid container>
          <Grid item sx={{ ml: "40%", color: "#90caf9", mb: 3 }}>
            <Typography variant="h4">Spares Inventory</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3, ml: 2 }}>
          <Grid item xs={12} sm={6} md={8} xl={8}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchButtonClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2} xl={2}>
            <Button
              variant="contained"
              sx={{ borderRadius: 5, mt: 1 }}
              onClick={handleOpenCreateDialog}
            >
              Create Spare
            </Button>
            <SparePartDialog
              open={isCreateDialogOpen}
              onClose={handleCloseCreateDialog}
              onSave={handleSaveSparePart}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} xl={2}>
            <Button variant="outlined" onClick={handleOpenReceiveDialog} sx={{ borderRadius: 5, mt: 1 }}>
              Receive Spare
            </Button>
            <ReceiveSparesDialog
              open={isReceiveDialogOpen}
              onClose={handleCloseReceiveDialog}
              onSave={handleSaveSparePart}
            />
          </Grid>
        </Grid>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <BoldTableCell>Item Code</BoldTableCell>
                <BoldTableCell>Item Name</BoldTableCell>
                <BoldTableCell>Qty</BoldTableCell>
                <BoldTableCell>Unit Price</BoldTableCell>
                <BoldTableCell>Value</BoldTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                  <TableCell>{item.qty * item.unitPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell>Total Units: {totalUnits}</TableCell>
                <TableCell colSpan={1} />
                <TableCell>Total Value: {totalValue}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </PageContainer>
    </PageSection>
  );
}

export default Inventory;
