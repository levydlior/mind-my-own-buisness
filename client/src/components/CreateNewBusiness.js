import React, { useState } from "react";

function CreateNewBusiness(loggedUser) {
  const id = loggedUser.loggedUser.loggedUser.loggedUser.id;

  const [businessForm, setBusinessForm] = useState({
    name: "",
    user_id: id,
  });
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

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
          console.log(business);
          setBusinessForm({
            name: "",
            user_id: id,
          });
        });
      } else {
        r.json().then((error) => setError(error));
      }
    });
  }

  return (
    <div>
      {!active ? (
        <button onClick={() => setActive(true)}>Add a Business</button>
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
          <button onClick={() => setActive(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default CreateNewBusiness;
