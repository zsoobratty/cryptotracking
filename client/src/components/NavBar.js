import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './AuthOptions'


const NavBar = ({query, setQuery, fetchCoinData}) => {

    const {userData} = useContext(UserContext)

    const handleCoinSearch = (e) => {
        e.preventDefault()
        fetchCoinData()
    }
    

    return (
            <nav className='NavBar'>
                <Link to="/"><h1 className='title'>CryptoTrack</h1></Link>
                <Link to="/coins"><h3>Top 100</h3></Link>
                <form className='NavBar-search-form' onSubmit={handleCoinSearch}>
                    <input className='NavBar-input' type="text" placeholder="Search for a coin..." onChange={(e) => setQuery(e.target.value)} value={query}/>
                    <input className='NavBar-button' type="submit" value="Search"/>
                </form>
                {userData.user && <Link to="/portfolio"><h3>Portfolio</h3></Link>}
                {userData.user && <Link to="/addcoin"><h3>Add to Portfolio</h3></Link>}
                <AuthOptions />
            </nav>
    )
}

export default NavBar
