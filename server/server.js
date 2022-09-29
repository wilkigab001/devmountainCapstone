const express = require('express')
const cors = require('cors')

const app = express()

//require('dotenv').config()

//const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

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

//app.put('/changeTrailName/:id', changeTrailName)


app.listen(4567, () => {
    console.log('Justice league just got their butts kicked on port ' + 4567)
})