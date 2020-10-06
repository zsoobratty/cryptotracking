const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
const slug = require('mongoose-url-slugs')

mongoose.plugin(slug)

// Create Schema
const coinSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    holding: {
        type: Number,
        required: true
    },
    initialValue: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        slug: "title"
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