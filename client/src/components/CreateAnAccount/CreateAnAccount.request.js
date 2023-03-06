

export const handleCreateAccountSubmit = (e, createAccountForm, onCreate, setErrors) => {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(createAccountForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onCreate(user);
          setErrors([]);
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  };