let trails = require('./db.json')
let id = 6

module.exports = {
    showTrails: (req, res) => {
        res.status(200).send(trails)
    },

    addTrail: (req,res) => {
        const{trailName, trailLength, trailLocation, likeIt, ranking} = req.body
 
        let trailObject = {
            trailName: trailName,
            trailLength: trailLength,
            trailLocation: trailLocation,
            likeIt: likeIt,
            ranking: ranking,
            id: id
        }

        trails.push(trailObject)

        id++

        res.status(200).send(trails)
    },

    changeTrail: (req, res) => {
        const index = trails.findIndex(el => el.id === +req.params.id)
        const {type} = req.body
        if(type === 'minus' && trails[index].ranking > 1){
            trails[index].ranking -= 1
            res.status(200).send(trails)
        }else if(type === 'plus' && trails[index].ranking < 5){
            trails[index].ranking += 1
            res.status(200).send(trails)
        }else{
            res.status(400).send('Your rating is to low or to high. It cannot be better than 5 or worse than 1')
        }



    },
    
    deleteTrail: (req, res) => {
        const index = trails.findIndex(el => el.id === +req.params.id)
        
        trails.splice(index, 1)
        
        res.status(200).send(trails)
    } 
    
    // changeTrailName: (req,res) => {
    //    const index = trails.findIndex(el => el.id === +req.params.id)

    // }
}