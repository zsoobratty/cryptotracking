import axios from 'axios'
import React, { useState } from 'react'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import M from "materialize-css";


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const handleSignIn = async (e) => {
        e.preventDefault()

        try {
            const loginResponse = await axios.post('/signin', {
                email,
                password
            })
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            localStorage.setItem("token", loginResponse.data.token)
            history.push('/')
        }
        catch (error) {
            M.toast({html: 'Invalid credentials. Please check and try again.'})
        }
    }

    return (
        <div>
            This is the sign in page
            <form>
                <input 
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignIn}>Submit</button>
            </form>
        </div>
    )
}

export default SignIn
