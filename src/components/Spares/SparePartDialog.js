import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MenuItem, Select } from '@mui/material';

const initialFormData = {
  itemCode: '',
  itemName: '',
  itemPrice: '',
  unitPrice: '',
  supplier: '',
};

const supplierOptions = [
    'Supplier 1',
    'Supplier 2',
    'Supplier 3',
    // Add more supplier options as needed
  ];

const SparePartDialog = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState(null);
  const [mainDialogOpen, setMainDialogOpen] = useState(true);
  const [errors, setErrors] = useState({}); // Track validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // Validate form data before saving
    const validationErrors = {};
    if (!formData.itemCode) {
      validationErrors.itemCode = 'Item Code is required';
    }
    if (!formData.itemName) {
      validationErrors.itemName = 'Item Name is required';
    }
    if (!formData.unitPrice) {
      validationErrors.unitPrice = 'Unit Price is required';
    }
    if (!formData.supplier) {
      validationErrors.supplier = 'Supplier is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      // There are validation errors, do not proceed with saving
      setErrors(validationErrors);
      return;
    }
    try {
      await onSave(formData);
      setResponse({ type: 'success', message: 'Spare part created successfully' });
      setFormData(initialFormData);
    } catch (error) {
      setResponse({
        type: 'error',
        message: 'Failed to create spare Part. Please try again later',
      });
    } finally {
      // Close the main dialog after saving, regardless of success or error
      setMainDialogOpen(false);
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
        <Dialog open={open} onClose={handleCloseResponse} PaperProps={{
            style: {
              borderRadius: '20px', // Adjust the value to your desired borderRadius
            },
          }} >
          <DialogTitle >Create Spare Part</DialogTitle>
          <DialogContent>
            <TextField
              name="itemCode"
              label="Item Code"
              fullWidth
              value={formData.itemCode}
              onChange={handleChange}
              style={{ marginBottom: 6 }}
            />
            <TextField
              name="itemName"
              label="Item Name"
              fullWidth
              value={formData.itemName}
              onChange={handleChange}
              style={{ marginBottom: 6 }}
            />
            <TextField
              name="unitPrice"
              label="Unit Price"
              type="number"
              fullWidth
              value={formData.unitPrice}
              onChange={handleChange}
              style={{ marginBottom: 6 }}
            />
           <Select
              name="supplier"
              label="Supplier"
              placeholder='supplier'
              fullWidth
              value={formData.supplier}
              onChange={handleChange}
            >
              {supplierOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResponse} color="primary">
              Close
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
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
};

export default SparePartDialog;