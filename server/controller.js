let trails = require('./db.json')

module.exports = {
    showTrails: (req, res) => {
        res.status(200).send(trails)
    },

    addTrail: (req,res) => {
        console.log(req.body)
    }
}