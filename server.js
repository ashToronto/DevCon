const express = require('express')
const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT || 3000

// Connecting mongo db from config file
connectDB()

app.get('/', (req, res) => res.send('API is running'))

// Define Routes/api
app.use('/api/users',    require('./routes/api/users'))
app.use('/api/auth',     require('./routes/api/auth'))
app.use('/api/profile',  require('./routes/api/profile'))
app.use('/api/posts',    require('./routes/api/posts'))


app.listen(PORT, () => console.log(`server started on ${PORT}`))
