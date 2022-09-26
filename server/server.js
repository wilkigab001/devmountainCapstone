const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const controller = require('./controller');


app.listen(port, () => {
    console.log('listening on port ' + port)
})