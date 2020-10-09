import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Home = () => {
    const {userData} = useContext(UserContext)
    return (
        <div>
            { userData.user ? 
                ( 
                    <h2>Welcome {userData.user.name}!</h2>
                ) : (
                    <h2>Welcome to CryptoTracker</h2>
                )
            }
        </div>
    )
}

export default Home
