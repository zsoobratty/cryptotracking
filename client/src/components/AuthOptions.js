import React from 'react'
import {useHistory} from 'react-router-dom'

const AuthOptions = () => {
    const history = useHistory()

    const signUp = () => history.push('/signup')
    const signIn = () => history.push('/signin')

    return (
        <div>
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}

export default AuthOptions
