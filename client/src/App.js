import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import CreateAnAccount from "./components/CreateAnAccount";
import Login from "./components/Login";
import MainContent from "./components/MainContent";
import styled from "@emotion/styled";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;

`;

const WelcomeText = styled.div`
justify-content: center;
text-align: center;
`

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const history = useHistory();

  useEffect(() => {
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
  }, []);

  function onLoginOrCreate(user) {
    setLoggedUser(user);
    setAuthorized(true);
    history.push("/businesses");
    setLoggedUser(user);
  }

  function handleLogOut(e) {
    e.preventDefault();
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setLoggedUser(null);
        history.push("/");
      }
    });
  }

  if (!authorized) {
    return <div></div>;
  }

  return (
    <div className="App">
      <Header>
        {loggedUser ? (
          <>
            <h1>Mind My Own businesses</h1>
            <Link to="/" onClick={handleLogOut}>
              Log out
            </Link>
          </>
        ) : (
          <h1>Mind My Own businesses</h1>
        )}
      </Header>
      {!loggedUser ? (
        <Switch>
          <Route exact path="/">
            <CreateAnAccount onCreate={onLoginOrCreate} />
          </Route>
          <Route exact path="/create-account">
            <CreateAnAccount onCreate={onLoginOrCreate} />
          </Route>
          <Route exact path="/login">
            <Login onLogin={onLoginOrCreate} />
          </Route>
          <Route exact path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/businesses">
            <MainContent loggedUser={loggedUser} />
          </Route>
          <Route exact path="/">
            <WelcomeText>
            <h2>Welcome {loggedUser.username}</h2>
            </WelcomeText>
          </Route>
          <Route exact path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
