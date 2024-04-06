import React, { createContext, useState } from "react";
import CustomizedSnackbars from "../components/CustomizedSnackbars";
export const Snackbar = createContext();
function SnackBarContextProvider({ children }) {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar.Provider
      value={{ open, handleClick, handleClose, setData, setError }}
    >
      {children}
      <CustomizedSnackbars
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        data={data}
        error={error}
      />
    </Snackbar.Provider>
  );
}

export default SnackBarContextProvider;
