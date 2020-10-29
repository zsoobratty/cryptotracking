import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import axios from 'axios'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Coins from './components/Coins'
import CoinDetails from './components/CoinDetails'
import UserContext from './context/UserContext'
import NoCoin from './components/NoCoin'
import M from 'materialize-css'
import './App.css';
import Portfolio from './components/Portfolio';



function Routing() {
  const history = useHistory()

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  const [coinData, setCoinData] = useState({})
  const [params, setParams] = useState('')
  const [coins, setCoins] = useState([])
  const [query, setQuery] = useState('')

  const fetchCoinData = async () => {
    if(query !== '') {
      await axios.get(`https://api.coingecko.com/api/v3/coins/${query.toLowerCase()}`)
      .then((res) => {
        if(res.data) {
          console.log(res.data)
          setCoinData(res.data)
          setQuery('')
          history.push('/coin/' + query.toLowerCase())
      }})
        .catch((error) => {
          console.log('error', error)
          setCoinData(undefined)
          history.push('/coin/' + query.toLowerCase())
        })
    } else {
      setCoinData(undefined)
      return M.toast({html: 'Please enter a coin', classes:"toast"})
    }
  }

  useEffect(() => {
    const fetchParamData = async () => {
      if(params) {
        await axios.get(`https://api.coingecko.com/api/v3/coins/${params}`)
        .then((res) => {
          setCoinData(res.data)
        })
        .catch((err) => {
          setCoinData(undefined)
        })
      }
    }
    fetchParamData()
  }, [params])


  useEffect(() => {
    const fetchData = async () => {
      const topCoins = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      if(topCoins.data) {
        setCoins(topCoins.data)
      }
    }
    fetchData()
  }, [])

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
        <UserContext.Provider value={{userData, setUserData}}>
          <NavBar query={query} setQuery={setQuery} coinData={coinData} fetchCoinData={fetchCoinData} />
          <Switch>
            <Route exact path="/" >
                <Home />
                <Portfolio />
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
              <Coins coins={coins}/>
            </Route>
            <Route path="/coin/:id">
              <CoinDetails setParams={setParams} coinData={coinData}/>
            </Route>            
            <Route path="/invalidcoin">
              <NoCoin query={query}/>
            </Route>
        </Switch>
        </UserContext.Provider> 
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routing />
    </Router>
  )
}

export default App

