const express = require('express')

require('dotenv').config()

const path = require('path')

const cors = require('cors')

const port = process.env.PORT || 4000

const app = express()



app.use(express.json())
app.use(express.static('client'))
app.use(cors())

app.use('/', express.static(path.join(__dirname, '../client/trails.html')))
app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/trails.html'))
})

app.get('/js/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/main.js'))
})

app.get('/css/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.css'))
})


const controller = require('./controller')
const {showTrails,
       addTrail, 
       changeTrail, 
       deleteTrail,
       changeTrailName}
    = controller


app.get('/showTrails', showTrails)
app.post('/addTrails', addTrail)
app.delete('/deleteTrail/:id', deleteTrail)
app.put('/changeTrailRating/:id', changeTrail)
app.put('/changeTrailName/:id', changeTrailName)



app.listen(port, () => {
    console.log('Justice league just got their butts kicked on port ' + port)
})