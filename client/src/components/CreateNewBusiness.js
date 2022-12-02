import { useState } from "react";

import BusinessFormPopOver from "./BusinessFormPopOver";

function CreateNewBusiness({ loggedUser, onAddBusiness }) {
  const id = loggedUser.id;
  const [businessForm, setBusinessForm] = useState({
    name: "",
    user_id: id,
  });

  const [anchorEl, setAnchorEl] = useState(null);

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
          setAnchorEl(null);
        });
      } else {
        r.json().then((error) => {
          setError(error);
          setBusinessForm(initialForm);
        });
      }
    });
  }

  return (
    <div>
      <BusinessFormPopOver
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleSubmit={handleSubmit}
        businessForm={businessForm}
        handleChange={handleChange}
        error={error}
        setError={setError}
      />
    </div>
  );
}

export default CreateNewBusiness;
