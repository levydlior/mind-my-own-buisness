import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

const ReceiptForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
`;

export default function ReceiptFormPopOver({
  handleImageChange,
  handleSubmit,
  receiptForm,
  handleChange,
  error,
  uploading,
  anchorEl,
  setAnchorEl,
  setError,
}) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleCancelClick() {
    setAnchorEl(null);
    setError([]);
  }

  return (
    <div>
      <Button
        color="secondary"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{ "text-transform": "none" }}
      >
        Add A Receipt
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          {uploading ? (
            <h3>Uploading!</h3>
          ) : (
            <ReceiptForm onSubmit={(e) => handleSubmit(e)}>
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
              {error.length > 0 ? <p>{error}</p> : null}
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
              <Button
                sx={{ "text-transform": "none" }}
                color="secondary"
                variant="contained"
                type="submit"
                value="Add Receipt"
              >
                Add receipt
              </Button>
              <Button
                sx={{ "text-transform": "none" }}
                color="secondary"
                variant="contained"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </ReceiptForm>
          )}
        </Typography>
      </Popover>
    </div>
  );
}
