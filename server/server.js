const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const controller = require('./controller')
const {showTrails, addTrail, changeTrail, deleteTrail} = controller


//app.get('/client/trails.html/trails', showTrails())
app.post('/client/trails.html', addTrail())
//app.put('/client/trails.html', changeTrail()
//app.delete('/client/trails.html', deleteTrail())


app.listen(port, () => {
    console.log('listening on port ' + port)
})