import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../config';

const initialFormData = {
  userName: "",
  password: "",
  name: "",
  phoneNumber: "",
  email: "",
  userType: "",
};

const userTypeOptions = [
  "User",
  "Admin",
  "Technician",
  // Add more supplier options as needed
];

const CreateUserDialog = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState(null);
  const [mainDialogOpen, setMainDialogOpen] = useState(true);
  const [errors, setErrors] = useState({}); // Track validation errors
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    if (!formData.name) {
      validationErrors.name = "name is required";
    }
    if (!formData.userName) {
      validationErrors.userName = "userName is required";
    }
    if (!formData.password) {
      validationErrors.password = "password is required";
    }
    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = "phoneNumber is required";
    }
    if (!formData.email) {
      validationErrors.email = "email is required";
    }
    if (!formData.userType) {
      validationErrors.userType = "userType is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      // There are validation errors, do not proceed with saving
      setResponse({ type: "error", message: "Please fix validation errors" });
      return;
    }
    try {
      const response = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // User created successfully
        setResponse({ type: 'success', message: 'User created successfully' });
        onSave();
      } else {
        // Handle server error or validation errors
        const responseData = await response.json();
        setResponse({ type: 'error', message: responseData.message || 'An error has occurred' });
      }
    } catch (error) {
      setResponse({
        type: 'error',
        message: 'Failed to create User. Please try again later',
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
        <Dialog
          open={open}
          onClose={handleCloseResponse}
          PaperProps={{
            style: {
              borderRadius: "20px", // Adjust the value to your desired borderRadius
            },
          }}
        >
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <TextField
              name="userName"
              label="User Name"
              fullWidth
              value={formData.userName}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
            />
            <TextField
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              type="number"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
            />
            <Select
              name="userType"
              label="UserType"
              placeholder="userType"
              fullWidth
              value={formData.userType}
              onChange={handleChange}
              style={{ marginBottom: 6, marginTop: 6 }}
            >
              {userTypeOptions.map((option) => (
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
        <Dialog
          open={!!response}
          onClose={handleCloseResponse}
          PaperProps={{
            style: {
              borderRadius: "20px", // Adjust the value to your desired borderRadius
            },
          }}
        >
          <DialogContent>
            <div style={{ textAlign: "center" }}>
              {response.type === "success" ? (
                <CheckCircleIcon style={{ color: "green", fontSize: 60 }} />
              ) : (
                <div style={{ color: "red" }}>Error has occurred</div>
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
CreateUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
export default CreateUserDialog;
