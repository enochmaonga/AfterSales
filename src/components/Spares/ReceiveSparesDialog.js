import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ReceiveSparesDialog({ open, onClose }) {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    const [mainDialogOpen, setMainDialogOpen] = useState(true);
    const [response, setResponse] = useState(null);
  
    const handleClose = () => {
      onClose();
      // Reset the form fields here if needed
    };
  
    const handleReceive = () => {
      // Handle the receiving of spare parts here
      // You can send this data to your backend or perform any other action
      console.log('Received Spare Parts:', {
        itemCode,
        itemName,
        qty,
        unitPrice,
        supplier,
      });
      handleClose();
    };

    const handleCloseResponse = () => {
      setResponse(null);
      onClose();
      // Reopen the main dialog when closing the response dialog
      setMainDialogOpen(true);
    };
  
    return (
      <>
      {mainDialogOpen && ( // Conditionally render the main dialog
      <Dialog open={open} onClose={handleClose} PaperProps={{
        style: {
          borderRadius: '20px'
        },
      }} >
        <DialogTitle>Receive Spare Parts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the spare parts you received.
          </DialogContentText>
          <TextField
            label="Item Code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReceive} color="primary">
            Receive
          </Button>
        </DialogActions>
      </Dialog>
      )}
      {response && (
        <Dialog open={!!response} onClose={handleCloseResponse} PaperProps={{
            style: {
              borderRadius: '20px', // Adjust the value to your desired borderRadius
            },
          }}>
          <DialogContent>
          <div style={{ textAlign: 'center' }}>
              {response.type === 'success' ? (
                <CheckCircleIcon style={{ color: 'green', fontSize: 60 }} />
              ) : (
                <div style={{ color: 'red' }}>Error</div>
              )}
              <div>{response.message}</div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResponse} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      </>
    );
  }
  
  export default ReceiveSparesDialog;