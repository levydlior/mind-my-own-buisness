import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import CreateAnAccount from './components/CreateAnAccount';
import Login from './components/Login';


function App() {


  const [loggedUser, setLoggedUser] = useState<object | null>(null);
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

  function onLoginOrCreate(user: object) {
    setLoggedUser(user)
    setAuthorized(true)
    console.log(user)
    setTimeout(() => {
      setLoggedUser(user);
      history.push("/");
    }, 1500);
  }

  function handleLogOut(e: React.SyntheticEvent) {
    e.preventDefault()
    fetch('/logout', {
      method: 'DELETE'
    }).then(r => {
      if (r.ok) {
        setLoggedUser(null)
        history.push('/')
      }
    })
  }

  if (!authorized){
    return <div></div>
  }

  return (
    <div className="App">

      <header>
        {loggedUser
          ? <Link to='/' onClick={handleLogOut}>Log out</Link>
          : <h2>hi</h2>
        }

      </header>
      {!loggedUser ?
        <Switch>
          <Route exact path='/'>
            <CreateAnAccount onCreate={onLoginOrCreate} />
          </Route>
          <Route exact path='/login'>
            <Login onLogin={onLoginOrCreate} />
          </Route>
          <Route exact path="*">
              <h1>404 not found</h1>
            </Route>
        </Switch>
        : <Switch>
          <Route path='bla'>
            <h2>bla</h2>
          </Route>
          <Route exact path='/'>
          <h2>logged</h2>
          </Route>
          <Route exact path="*">
              <h1>404 not found</h1>
            </Route>
        </Switch>
      }


    </div>
  );
}

export default App;
