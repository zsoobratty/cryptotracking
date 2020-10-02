import React, {useState} from 'react'
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            )
          ) {
            alert('Invalid Email Address')
            return;
          }
          axios.post('/signup', {
              name,
              email,
              password
          })
          .then((res) => {
              console.log(res)
          })
          .catch((err) => {
              console.log(err)
          })

    }

    return (
        <div>
            This is the sign up page
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
            <button onClick={postData}>Submit</button>
        </div>
    )
}

export default SignUp
