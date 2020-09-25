const express = require('express')
const User = require('../models/User')

const router = express.Router()

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// Sign in a registered user
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if(!user) {
            return res.status(401).send({ error: 'Login failed - please check your credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router