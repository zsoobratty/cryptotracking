import React from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './AuthOptions'

const NavBar = () => {
    const {userData} = useContext(UserContext)

    return (
            <nav className='NavBar'>
                <Link to="/"><h1 className='title'>CryptoTrack</h1></Link>
                {userData.user && <Link to="/portfolio"><h3>Portfolio</h3></Link>}
                <Link to="/coins"><h3>Top 100</h3></Link>
                <form className='NavBar-search-form'>
                    <input type="text" placeholder="Search for a coin"/>
                    <input type="submit" value="Search"/>
                </form>
                <AuthOptions />
            </nav>
    )
}

export default NavBar
