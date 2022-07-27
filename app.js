// initial config
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

// Read json - MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// API Rutes
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)



// Connection
mongoose.connect(process.env.MONGO)
    .then(() => {
        // Start server
        app.listen(3000)
        console.log('Connected on MongoDB')
    })
    .catch((e) => {
        console.log(e.message)
    })
