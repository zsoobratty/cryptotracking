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
                {userData.user && <Link to="/profile"><h3>Profile</h3></Link>}
                <Link to="/coins"><h3>Top 100</h3></Link>
                <AuthOptions />
            </nav>
    )
}

export default NavBar
