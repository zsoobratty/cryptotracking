const express = require('express')
const Coin = require('../models/Coin')
const requireToken = require('../middleware/requireToken')

const router = express.Router()

router.get('/mycoins', requireToken, async (req, res) => {
    try {
        await Coin.find({savedBy: req.user._id})
        .then(myCoins=> {
            res.status(200).send({myCoins})
        }
    )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.post('/mycoins/add', requireToken, async (req, res) => {
    try{
        const { name, holding, purchasePrice, currentPrice, symbol } = req.body
        if(!name || !holding || !purchasePrice || !symbol || !currentPrice) {
            return res.status(422).json({error: "Missing information"})
        }

        const coin = new Coin({
            name,
            holding,
            purchasePrice,
            currentPrice,
            symbol,
            savedBy: req.user
        })
        await coin.save()
        res.status(201).send('Coin successfully added')  
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/mycoins/:id', requireToken, async (req, res) => {
    const coin = await Coin.findOne({name: req.params.id})
    if (coin.currentPrice != null) {
        coin.currentPrice = req.body.currentPrice
    } 
    try {
        const updatedCoin = await coin.save()
        res.json(updatedCoin)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
})

module.exports = router