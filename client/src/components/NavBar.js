import Axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './AuthOptions'
import M from 'materialize-css'

const NavBar = () => {
    const [query, setQuery] = useState('')
    const [coin, setCoin] = useState({})
    const {userData} = useContext(UserContext)
    const history = useHistory()

    const fetchData = async () => {
        if(query !== '') {
            const result = await Axios.get(`https://api.coingecko.com/api/v3/coins/${query}`)
            console.log(result)
            if(!result.data) {
                M.toast({html: `Unable to find a coin under the name of ${query}`, classes: "toast"})
            }
            setCoin(result.data)
            setQuery('')
            history.push(`/coin/${query}`)
        } else {
            M.toast({html: 'Please enter the name of a coin', classes:"toast"})
        }
    }

    const handleCoinSearch = (e) => {
        e.preventDefault()
        fetchData()
    }
    

    return (
            <nav className='NavBar'>
                <Link to="/"><h1 className='title'>CryptoTrack</h1></Link>
                {userData.user && <Link to="/portfolio"><h3>Portfolio</h3></Link>}
                <Link to="/coins"><h3>Top 100</h3></Link>
                <form className='NavBar-search-form' onSubmit={handleCoinSearch}>
                    <input type="text" placeholder="Search for a coin" onChange={(e) => setQuery(e.target.value)} value={query}/>
                    <input type="submit" value="Search"/>
                </form>
                <AuthOptions />
            </nav>
    )
}

export default NavBar
