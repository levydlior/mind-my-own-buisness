import React, { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

function CreateNewBusiness({
  loggedUser,
  active,
  handleActiveChange,
  onAddBusiness,
}) {
  const id = loggedUser.id;
  const [businessForm, setBusinessForm] = useState({
    name: "",
    user_id: id,
  });

  const [error, setError] = useState(null);

  const initialForm = {
    name: "",
    user_id: id,
  };

  function handleChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    setBusinessForm({ ...businessForm, [target]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/businesses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(businessForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((business) => {
          setError(null);
          onAddBusiness(business);
          setBusinessForm(initialForm);
        });
      } else {
        r.json().then((error) => {
          setError(error);
          setBusinessForm(initialForm);
        });
      }
    });
  }

  function handleClick() {
    handleActiveChange(false);
    setError(null);
    setBusinessForm(initialForm);
  }

  return (
    <ErrorInputDiv>
      {!active ? (
        <Button>
          <Button onClick={() => handleActiveChange(true)} variant="contained">
            Add a business
          </Button>
        </Button>
      ) : (
        <BusniessForm onSubmit={handleSubmit}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Business Name"
            variant="outlined"
            name="name"
            type="text"
            required
            value={businessForm.name}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Add a business
          </Button>
          <Button type="submit" variant="contained" onClick={handleClick}>
            Cancel
          </Button>
        </BusniessForm>
      )}
      {error ? <p>{error.errors[0]}</p> : null}
    </ErrorInputDiv>
  );
}

export default CreateNewBusiness;
