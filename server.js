const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const port = process.env.PORT || 5000


const app = express()

app.use(express.json());
app.use(userRouter)

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