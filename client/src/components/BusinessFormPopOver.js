import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

const BusniessForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 40rem;
  flex-wrap: wrap;
`;
const ErrorInputDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default function BusinessFormPopOver({
  anchorEl,
  setAnchorEl,
  handleSubmit,
  businessForm,
  handleChange,
  error,
  setError,
}) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleCancelClick() {
    setAnchorEl(null);
    setError(null);
  }

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
          <BusniessForm onSubmit={(e) => handleSubmit(e)}>
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
            {error ? <ErrorInputDiv> {error.errors[0]}</ErrorInputDiv> : null}
            <Button type="submit" variant="contained">
              Add a business
            </Button>
            <Button variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
          </BusniessForm>
        </Typography>
      </Popover>
    </div>
  );
}
