import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({ open, severity, message, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
