import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({
  handleClose,
  open,
  data,
  error,
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error ? error : data}
        </Alert>
      </Snackbar>
    </div>
  );
}
