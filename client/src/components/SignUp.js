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
        if(!name || !email || !password) {
            M.toast({html: "Please complete all fields", classes: "toast"})
            return;
        }
        // if (
        //     !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        //       email
        //     )
        //   ) {
        //     M.toast({ html: "Invalid Email Address", classes: "toast"});
        //     return;
        //   }
          await axios.post('/signup', {
              name,
              email,
              password
          })
          .catch(err => {
              console.log(err)
            M.toast({html: err, classes: "toast"})
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
            <h3>Sign up to track your coins!</h3>
            <form className='SignUp-form'>
                <h5>Name:</h5>
                <input 
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <h5>Email address:</h5>
                <input 
                    type="text"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h5>Password:</h5>
                <input 
                    type="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp
