const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json());


// DB config
const db = require('./config/keys').MONGOURI;

// Connect to DB
mongoose.connect(db, 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true 
    } 
)
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log(err))

app.get("/", (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}`))