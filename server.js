const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on ${PORT}`))

app.get('/', (req, res) => res.send('API is running'))
