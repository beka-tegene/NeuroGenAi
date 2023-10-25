import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import Cookies from "js-cookie";
import { AccountCircle } from "@mui/icons-material";
const Setting = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const initialUserData = {
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    date_of_birth: "1990-01-01",
    age: 33,
    email: "john@example.com",
    phone_number: "123-456-7890",
    country: "USA",
    city: "New York",
    address: "123 Main St, Apt 4B",
  };

  const initialPasswordData = {
    password: "Pa$$w0rd!",
    confirm_password: "Pa$$w0rd!",
  };

  const [userData, setUserData] = useState({ ...initialUserData });
  const [passwordData, setPasswordData] = useState({ ...initialPasswordData });
  console.log(userData);
  console.log(passwordData);
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handlePasswordEdit = () => {
    setPasswordEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    // You can save the changes to the backend here
  };

  const handleCancel = () => {
    setUserData({ ...initialUserData });
    setPasswordData({ ...initialPasswordData });
    setEditMode(false);
    setPasswordEditMode(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Stack sx={{ width: "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10vh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Settings
        </Typography>
      </Stack>
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Paper elevation={3} sx={{ width: "80%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Account Settings
            </Typography>
            {!editMode && (
              <Box>
                <Button variant="outlined" color="info" onClick={handleEdit} sx={{ mr: 2 }}>
                  Edit
                </Button>
                <IconButton
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <AccountCircle color="primary" fontSize="large" />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {editMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>

          {editMode ? (
            <Grid container spacing={2}>
              {Object.keys(userData).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <Typography variant="body1">
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={userData[field]}
                    onChange={(e) =>
                      setUserData({ ...userData, [field]: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {Object.keys(userData).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {userData[field]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
        <Paper elevation={3} sx={{ width: "80%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Password Settings
            </Typography>
            {!passwordEditMode && (
              <Button
                variant="outlined"
                color="info"
                onClick={handlePasswordEdit}
              >
                Edit
              </Button>
            )}
            {passwordEditMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>
          {passwordEditMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Confirm Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordData.confirm_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm_password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {/* {Object.keys(passwordData).map((field) => ( */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Password
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {passwordData.password}
                </Typography>
              </Grid>
              {/* ))} */}
            </Grid>
          )}
        </Paper>
      </Stack>
      <Stack
        sx={{
          p: 2,
          mt: 2,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default Setting;
