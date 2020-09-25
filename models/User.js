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
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async (next) => {
    // Hash the password before saving User model
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async () => {
    // Generate a token for the user
    const user = this
    const JWT_KEY = require('../config/keys').JWT_KEY
    const token = jwt.sign({ _id: user._id}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    
    await user.save()
    return token
}

userSchema.methods.findByCredentials = async (email, password) => {
    // Search for user by email and password
    const user = User.findOne( {email} )
    if(!user) {
        throw new Error ({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}




module.exports = User = mongoose.model('User', userSchema)