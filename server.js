const express = require('express')
const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT || 3000

// Connecting mongo db from config file
connectDB()

app.get('/', (req, res) => res.send('API is running'))

app.listen(PORT, () => console.log(`server started on ${PORT}`))
