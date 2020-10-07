import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from './AuthOptions'

const NavBar = () => {
    return (
            <nav className='NavBar'>
                <Link to="/"><h1 className='title'>CryptoTrack</h1></Link>
                <Link to="/profile"><h1>Profile</h1></Link>
                <Link to="/coins"><h1>Top 100</h1></Link>
                <AuthOptions />
            </nav>
    )
}

export default NavBar
