import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from './AuthOptions'

const NavBar = () => {
    return (
            <nav>
                <Link to="/">CryptoTrack</Link>
                <Link to="/profile">Profile</Link>
                <AuthOptions />
                <Link to="/coins">Top 100 Coins</Link>
            </nav>
    )
}

export default NavBar
