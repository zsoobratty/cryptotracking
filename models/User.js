const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: "Invalid Email address"})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // Multiple tokens for allowing tokens from logging in on different devices
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Hash the password before saving User model using bcrypt
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


// Generate a token for the user and save in User model
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const JWT_KEY = require('../config/keys').JWT_KEY
    const token = jwt.sign({ _id: user._id}, JWT_KEY)
    // Allows multiple tokens for logging in on difference devices
    user.tokens = user.tokens.concat({token})
    
    await user.save()
    return token
}

// Check for user credentials and return user if valid username and password
userSchema.statics.findByCredentials = async (email, password) => {
    // Search for user by email and password
    const user = await User.findOne( {email} )
    if(!user) {
        throw new Error ('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User 