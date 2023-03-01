import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  BusinessForm,
  ErrorInputDiv,
  PopOverButton,
} from "./BusinessFormPopOver.styles";

export const BusinessFormPopOver = ({
  anchorEl,
  setAnchorEl,
  handleSubmit,
  businessForm,
  handleChange,
  error,
  setError,
}) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCancelClick = () => {
    setAnchorEl(null);
    setError(null);
  };

  return (
    <div>
      <PopOverButton
        color="secondary"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        Add A Business
      </PopOverButton>
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
          <BusinessForm onSubmit={(e) => handleSubmit(e)}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Business Name"
              variant="outlined"
              name="name"
              type="text"
              required
              value={businessForm.name}
              onChange={(e) => handleChange(e)}
            />
            {error && <ErrorInputDiv> {error.errors[0]}</ErrorInputDiv>}
            <PopOverButton color="secondary" type="submit" variant="contained">
              Add a business
            </PopOverButton>
            <PopOverButton
              color="secondary"
              variant="contained"
              onClick={handleCancelClick}
            >
              Cancel
            </PopOverButton>
          </BusinessForm>
        </Typography>
      </Popover>
    </div>
  );
};
