import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'
import M from "materialize-css";
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            )
          ) {
            M.toast({ html: "Invalid Email Address", classes: "#e53935 red darken-1" });
            return;
          }
          await axios.post('/signup', {
              name,
              email,
              password
          })
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

    return (
        <div className='SignUp'>
            This is the sign up page
            <form>
                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp
