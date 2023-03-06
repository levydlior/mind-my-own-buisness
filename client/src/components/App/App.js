import { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import CreateAnAccount from "../CreateAnAccount/CreateAnAccount";
import Login from "../Login/Login";
import MainContent from "../MainContent/MainContent";
import Header from "../Header/Header";
import { WelcomeText } from "./App.styles";
import { fetchUserRequest, logoutRequest } from "./App.request";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchUserRequest(setLoggedUser, setAuthorized);
  }, []);

  const onLoginOrCreate = (user) => {
    setLoggedUser(user);
    setAuthorized(true);
    history.push("/businesses");
    setLoggedUser(user);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutRequest(setLoggedUser, setAuthorized, history);
  };

  if (!authorized) {
    return <div></div>;
  }

  return (
    <div>
      <Header loggedUser={loggedUser} onLogOut={handleLogOut} />
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
              <h2>Welcome {loggedUser.username}!</h2>
              <Link
                style={{ border: "solid", padding: "0.5rem" }}
                to="/businesses"
              >
                Your Businesses
              </Link>
            </WelcomeText>
          </Route>
          <Route exact path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
