import React from 'react'
import {useHistory} from 'react-router-dom'

const AuthOptions = () => {
    const history = useHistory()

    const signUp = () => history.push('/signup')
    const signIn = () => history.push('/signin')

    return (
        <nav className='AuthOptions'>
            <button onClick={signIn}><h1>Login</h1></button>
            <button onClick={signUp}><h1>Register</h1></button>
        </nav>
    )
}

export default AuthOptions
