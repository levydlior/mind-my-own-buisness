import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch, useHistory } from "react-router-dom";
import CreateAnAccount from './components/CreateAnAccount';
import Login from './components/Login';


function App() {


  const [loggedUser, setLoggedUser] = useState<any | null>(null);
  const [authorized, setAuthorized] = useState(false)


  const history = useHistory()

  useEffect(() => {
    fetch('/users/show').then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setLoggedUser(user)
          setAuthorized(true)
        })
      } else {
        setAuthorized(true)
      }
    })
  }, [])

  function onLoginOrCreate(user: object){
    setLoggedUser(user)
    console.log(user)
    setTimeout(() => {
      setLoggedUser(user);
      history.push("/");
    }, 1500);
  }

  return (
    <div className="App">

      <header>header</header>
      {!loggedUser ?
        <Switch>
          <Route exact path='/'>
            <CreateAnAccount />
          </Route>
          <Route exact path='/login'>
            <Login onLogin={onLoginOrCreate}/>
          </Route>

        </Switch>
        : <Switch>
          <Route exact path='/'>

          </Route>
        </Switch>
      }


    </div>
  );
}

export default App;
