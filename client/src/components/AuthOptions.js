import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'

const AuthOptions = () => {
    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory()

    const signUp = () => history.push('/signup')
    const signIn = () => history.push('/signin')
    const logOut = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("token", "")
    }

    return (
        <nav className='AuthOptions'>
            {userData.user ? (
                <button onClick={logOut}>Log out</button> 
            ) : (
                <div>
                    <button onClick={signIn}><h1>Login</h1></button>
                    <button onClick={signUp}><h1>Register</h1></button>
                </div>
            )
            }
        
        </nav>
    )
}

export default AuthOptions
