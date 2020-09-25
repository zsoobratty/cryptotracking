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
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        slug: "title"
    }
});

module.exports = Coin = mongoose.model('Coin', coinSchema)