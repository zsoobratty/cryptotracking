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
        res.status(400).send(error)
    }
})