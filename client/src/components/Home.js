import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import Portfolio from './Portfolio'


const Home = () => {
    const {userData} = useContext(UserContext)
    return (
        <div>
            { userData.user ? 
                ( 
                    <div>
                        <h2>Welcome {userData.user.name}!</h2>
                        <h3>Add your coin holdings and track your crypto performance!</h3>
                        <Portfolio />
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
