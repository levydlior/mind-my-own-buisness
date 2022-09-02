import React, { useState } from "react";

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
    setBusinessForm(initialForm);
  }

  return (
    <div>
      {!active ? (
        <button onClick={() => handleActiveChange(true)}>Add a Business</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={businessForm.name}
            onChange={handleChange}
            required
          />
          {error ? <p>{error.errors[0]}</p> : null}
          <input type="submit" value="Add" />
          <button onClick={handleClick}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default CreateNewBusiness;
