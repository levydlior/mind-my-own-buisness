import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function BasicPopover({
  handleImageChange,
  handleSubmit,
  receiptForm,
  handleChange,
  error,
  uploading,
  anchorEl,
  setAnchorEl,
}) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add A Receipt
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          {uploading ? (
            <h3>Uploading!</h3>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Receipt Name"
                variant="outlined"
                name="name"
                type="text"
                required
                value={receiptForm.name}
                onChange={(e) => handleChange(e)}
              />
              {error ? <p>{error}</p> : null}
              <TextField
                size="small"
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                name="amount"
                type="number"
                required
                value={receiptForm.amount}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                name="image"
                type="file"
                required
                onChange={(e) => handleImageChange(e)}
                accept="image"
                placeholder="image"
              />
              <Button variant="contained" type="submit" value="Add Receipt">
                Add receipt
              </Button>

              <Button variant="contained" onClick={() => setAnchorEl(null)}>
                Cancel
              </Button>
            </form>
          )}
        </Typography>
      </Popover>
    </div>
  );
}
