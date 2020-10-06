const express = require('express')
const Coin = require('../models/Coin')
const requireToken = require('../middleware/requireToken')

const router = express.Router()

router.post('/addCoin', requireToken, async(req, res) => {
    
})