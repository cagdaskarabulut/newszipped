import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MyAlert = ({ text, severity, isOpen, setIsOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity ? severity : "success"}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
