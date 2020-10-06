const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const coinRouter = require('./routes/coin')
const port = process.env.PORT || 5000


const app = express()

app.use(express.json());
app.use(userRouter)
app.use(coinRouter)

// DB config
const db = require('./config/keys').MONGOURI;

mongoose.set('useCreateIndex', true)

// Connect to DB
mongoose.connect(db, 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true 
    } 
)
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log(err))

app.listen(port, () => console.log(`App listening on port ${port}`))