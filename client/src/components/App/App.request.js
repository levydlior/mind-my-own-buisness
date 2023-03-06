

export const fetchUserRequest = (setLoggedUser, setAuthorized) => {
    fetch("/users/show").then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setLoggedUser(user);
            setAuthorized(true);
          });
        } else {
          setAuthorized(true);
        }
      });
}

export const logoutRequest = (setLoggedUser, setAuthorized, history) => {
    fetch("/logout", {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          setLoggedUser(null);
          setAuthorized(true);
          history.push("/");
        }
      });
}