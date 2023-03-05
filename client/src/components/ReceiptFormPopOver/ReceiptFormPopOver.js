import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  ReceiptForm,
  ReceiptPopButton,
  TextFieldReceipt,
} from "./ReceiptFormPopOver.styles";

export const ReceiptFormPopOver = ({
  handleImageChange,
  handleSubmit,
  receiptForm,
  handleChange,
  error,
  uploading,
  anchorEl,
  setAnchorEl,
  setError,
  setReceiptForm,
  originalForm,
}) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { name, amount, date_field } = receiptForm;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCancelClick = () => {
    setAnchorEl(null);
    setError([]);
    setReceiptForm(originalForm);
  };

  return (
    <div>
      <ReceiptPopButton
        color="secondary"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        Add A Receipt
      </ReceiptPopButton>
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
              <TextFieldReceipt
                size="small"
                id="outlined-basic"
                label="Receipt Name"
                variant="outlined"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => handleChange(e)}
              />
              {error.length > 0 && <p>{error}</p>}
              <TextFieldReceipt
                size="small"
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                name="amount"
                type="number"
                required
                inputProps={{
                  min: 0,
                }}
                value={amount}
                onChange={(e) => handleChange(e)}
              />
              <TextFieldReceipt
                size="small"
                id="outlined-basic"
                label="Date"
                variant="outlined"
                name="date_field"
                type="date"
                required
                value={date_field}
                onChange={(e) => handleChange(e)}
                InputLabelProps={{ shrink: true }}
              />
              <TextFieldReceipt
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
              <ReceiptPopButton
                color="secondary"
                variant="contained"
                type="submit"
                value="Add Receipt"
              >
                Add receipt
              </ReceiptPopButton>
              <ReceiptPopButton
                color="secondary"
                variant="contained"
                onClick={handleCancelClick}
              >
                Cancel
              </ReceiptPopButton>
            </ReceiptForm>
          )}
        </Typography>
      </Popover>
    </div>
  );
};
