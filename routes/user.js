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
        res.status(400).send({error: error.message})
    }
})

// Sign in a registered user
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
        }, 
            token})
    }
    catch (error) {
        res.status(400).send({error: error.message})
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
        const user = await User.findById(verified._id)
        if(!user) return res.json({error: 'No user'})

        return res.json(true)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router