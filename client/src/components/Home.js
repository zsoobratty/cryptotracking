import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Home = () => {
    const {userData} = useContext(UserContext)
    return (
        <div>
            { userData.user ? 
                ( 
                    <div>
                    <h2>Welcome {userData.user.name}!</h2>
                    </div>

                ) : (
                    <div>
                    <h2>Welcome to CryptoTracker</h2>
                    <h4>Please sign up or sign in to continue</h4>
                    </div>
                )
            }
        </div>
    )
}

export default Home
