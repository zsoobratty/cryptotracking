const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

// Create Schema
const coinSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    holding: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    date: {
    type: Date,
    default: Date.now
    },
    savedBy: {
        type: ObjectId,
        ref: "User"
    }
});

 const Coin = mongoose.model('Coin', coinSchema)
 module.exports = Coin