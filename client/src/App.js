import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Coins from './components/Coins'
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/coins">
              <Coins />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
