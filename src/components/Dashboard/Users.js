import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Card,
  styled,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CreateUserDialog from "./CreateUserDialog";

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "skyblue",
});

function Users() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleSaveUser = (formData) => {
  
    setUser([...user, formData]);
  };

  const handleRegisterUser = async (formData) => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // User registration was successful, you can update the UI as needed.
        const result = await response.json();
        console.log(result.success); // This will log the success message from the server.
      } else {
        // Handle registration error, e.g., show an error message to the user.
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const dummyUsers = [
    {
      id: 1,
      name: "John Doe",
      userName: "jdoes",
      email: "john@example.com",
      phone: "0722888657",
      userType: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      userName: "jsmith",
      email: "jane@example.com",
      phone: "0754763527",
      userType: "Admin",
    },
    {
      id: 2,
      name: "Joseph Ombiro",
      userName: "jombiro",
      email: "jombiro@gmail.com",
      phone: "0754768727",
      userType: "Admin",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "left",
          mt: 2,
          mb:4,
          color: "#a1887f",
        }}
      >
        Users
      </Typography>
      <Grid container >
        <Grid item xs={12} sm={6} md={8} xl={10}>
          <TextField
            id="search-bar"
            className="text"
            label="search by username"
            variant="outlined"
            placeholder="Enter userName"
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
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, mt: 1 }}
            onClick={handleOpenCreateDialog}
          >
            Create User
          </Button>
          <CreateUserDialog
            open={isCreateDialogOpen}
            onClose={handleCloseCreateDialog}
            onSave={handleRegisterUser}
          />
        </Grid>
      </Grid>
      <Card sx={{ width: "100%", mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell>Name</BoldTableCell>
              <BoldTableCell>User Name</BoldTableCell>
              <BoldTableCell>Phone</BoldTableCell>
              <BoldTableCell>Email</BoldTableCell>
              <BoldTableCell>User Type</BoldTableCell>
              <BoldTableCell>Action</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(users.length > 0 ? users : dummyUsers).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDeactivate(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

export default Users;
