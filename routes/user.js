const express = require('express')
const User = require('../models/User')
const requireToken = require('../middleware/requireToken')

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

// View user profile
router.get('/users/me', requireToken, async (req, res) => {
    res.send(req.user)
})

// Logout of device
router.post('/users/me/logout', requireToken, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', requireToken, async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router