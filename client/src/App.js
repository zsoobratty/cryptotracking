import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Coins from './components/Coins'
import UserContext from './context/UserContext'
import './App.css';
import Portfolio from './components/Portfolio';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem('token')
      if (token === null) {
        localStorage.setItem("token", "")
        token = ""
      }
      const tokenCheck = await axios.post(
        '/tokenIsValid', 
        null, 
        { headers: {"Authorization": token} }
      )
      if(tokenCheck.data) {
        const userResponse = await axios.get('/users/me', {headers: {"Authorization": token}})
        setUserData({
          token,
          user: userResponse.data
        })
      }
    }
    
    checkLogin()
  }, [])

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{userData, setUserData}}>
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
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/coins">
              <Coins />
            </Route>
        </Switch>
        </UserContext.Provider>
      </Router>
      
    </div>
  );
}

export default App;
