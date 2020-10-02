import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/coins">Top 100 Coins</Link>
            </nav>
    )
}

export default NavBar
