const mongoose = require('mongoose')
const Schema = mongoose.Schema;
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
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        slug: "title"
    }
});

 const Coin = mongoose.model('Coin', coinSchema)
 module.exports = Coin