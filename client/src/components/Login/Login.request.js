export const loginSubmitRequest = (
  e,
  loginForm,
  onLogin,
  setErrors,
  setLoginForm
) => {
  e.preventDefault();
  fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(loginForm),
  }).then((r) => {
    if (r.ok) {
      r.json().then((user) => {
        onLogin(user);
        setErrors([]);
      });
    } else {
      r.json().then((err) => {
        setLoginForm({
          username: "",
          password: "",
        });
        setErrors([err]);
      });
    }
  });
};
