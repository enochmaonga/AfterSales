import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { SERVER_URL } from '@/config';

function ReceiveSparesDialog({ open, onClose, onSave }) {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    const [mainDialogOpen, setMainDialogOpen] = useState(true);
    const [response, setResponse] = useState(null);
    const [itemCodesList, setItemCodesList] = useState([]);
  
    const handleClose = () => {
      onClose();
      // Reset the form fields here if needed
      resetFormFields();
    };

    const resetFormFields = () => {
      setItemCode('');
      setItemName('');
      setQty('');
      setUnitPrice('');
      setSupplier('');
    };
    useEffect(() => {
      const fetchItemCodes = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/spares`);
          if (response.ok) {
            const itemCodes = await response.json();
            setItemCodesList(itemCodes);
          } else {
            console.error("Failed to fetch item codes:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching item codes:", error);
        }
      };
    
      fetchItemCodes();
    }, []);
  
    const handleReceive = async () => {
      try {
        const itemExists = await checkItemExists();
    
        if (itemExists) {
          const formData = {
            itemCode,
            itemName,
            qty,
            unitPrice,
            supplier,
          };
    
          const result = await makeReceiveAPIRequest(formData);
          onSave(result);
        } else {
          setResponse({ type: 'error', message: 'Item does not exist' });
        }
      } catch (error) {
        handleAPIError(error);
      } finally {
        handleClose();
      }
    };
    
    const checkItemExists = async () => {
      try {
        const checkItemResponse = await fetch(`${SERVER_URL}/checkItem/${itemCode}`);
        
        console.log("Check Item Response:", checkItemResponse); // Log the entire response for debugging
        
        if (checkItemResponse.ok) {
          const itemExists = await checkItemResponse.json();
          console.log("Item Exists:", itemExists); // Log the parsed JSON for debugging
          return itemExists;
        } else {
          console.error("Check Item Request Failed:", checkItemResponse.statusText);
          return false;
        }
      } catch (error) {
        console.error("Error checking item existence:", error);
        return false;
      }
    };
    
    const makeReceiveAPIRequest = async (formData) => {
      const receiveResponse = await fetch(`${SERVER_URL}/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (receiveResponse.ok) {
        return await receiveResponse.json();
      }
    
      handleAPIError(receiveResponse);
    };
    
    const handleAPIError = async (errorResponse) => {
      try {
        const contentType = errorResponse.headers.get('content-type');
    
        if (contentType && contentType.startsWith('application/json')) {
          const error = await errorResponse.json();
          setResponse({ type: 'error', message: error.message });
        } else {
          const errorText = await errorResponse.text();
          setResponse({ type: 'error', message: errorText });
        }
      } catch (error) {
        setResponse({ type: 'error', message: 'An error occurred during the API call.', error });
      }
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
          >
              {itemCodesList.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
            </TextField>
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
              {response.type === 'error' ? (
                 <div style={{ color: 'red' }}>Error</div>
                 ) : (
                <CheckCircleIcon style={{ color: 'green', fontSize: 60 }} />

               
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
  ReceiveSparesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  
  export default ReceiveSparesDialog;