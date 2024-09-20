import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function BtnResetPassword() {
  const [open, setOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResetClose = () => {
    setResetOpen(false);
  };
  const handleResetPassword = () => {
    axios
      .post("https://localhost:5001/api/Account/login", {
        email,
        password: oldPassword,
      })
      .then(() => {
        setOpen(false);
        setResetOpen(true);
      })
      .catch((error) => {
        alert("Verification failed. Incorrect password or email");
        console.error("Verification failed:", error);
      });
  };
  const handleConfirmReset = () => {
    if (newPassword === confirmNewPassword) {
      const storedAlumni = localStorage.getItem("alumni");
      if (storedAlumni) {
        const alumniData = JSON.parse(storedAlumni);
        const userId = alumniData.id;

        axios
          .post("https://localhost:5001/api/Account/resetpassword", {
            id: userId, // Include the Id field in the request body
            password: newPassword,
          })
          .then(() => {
            setResetOpen(false);
          })
          .catch((error) => {
            alert(
              "Make the password atleast 6 letters, 1 number, 1 upper case letter, 1 special character"
            );
            console.error("Password reset failed:", error);
          });
      } else {
        console.error("Alumni data not found in localStorage");
      }
    } else {
      alert("Passwords do not match");
      console.error("Passwords do not match");
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={handleClickOpen}
        size="small"
        sx={{ borderRadius: "20px", mb: 3 }}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Verify Account</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e: any) => setOldPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={resetOpen} onClose={handleResetClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e: any) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e: any) => setConfirmNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetClose}>Cancel</Button>
          <Button
            onClick={handleConfirmReset}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default BtnResetPassword;
