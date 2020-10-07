const express = require('express')
const User = require('../models/User')
const requireToken = require('../middleware/requireToken')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/keys')

const router = express.Router()

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token, message: 'User successfully signed up' })
    }
    catch (error) {
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
    const user = await User.findById(req.user)
    res.json({
        id: user._id,
        name: user.name,
        email: req.email
    })
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

router.post('/tokenIsValid', async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) return res.json({error: 'No token'})

        const verified = jwt.verify(token, JWT_KEY)
        if(!verified) return res.json({error: 'Not verified'})
        console.log(verified)
        const user = await User.findById(verified._id)
        if(!user) return res.json({error: 'No user'})

        return res.json(true)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router