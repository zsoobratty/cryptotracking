const express = require('express')
const Coin = require('../models/Coin')
const requireToken = require('../middleware/requireToken')

const router = express.Router()

router.post('/addcoin', requireToken, async (req, res) => {
    try{
        const { name, holding, purchasePrice, symbol } = req.body
        if(!name || !holding || !purchasePrice || !symbol) {
            return res.status(422).json({error: "Missing information"})
        }
        const coin = new Coin({
            name,
            holding,
            purchasePrice,
            symbol,
            savedBy: req.user
        })
        await coin.save()
        res.status(201).send('Coin successfully added')
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router