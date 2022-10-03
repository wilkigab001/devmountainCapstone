let trails = require('./db.json')
let id = 6

module.exports = {
    showTrails: (req, res) => {
        let trailsRanked = []
        for (let i = 0; i < trails.length; i++) {
            if(i === 0) {
                trailsRanked.push(trails[i])
            }
            if(trails[i].ranking > trailsRanked[i].ranking){
                trailsRanked.unshift(trails[i])
            }else{
                trailsRanked.push(trails[i])
            }
        }
        res.status(200).send(trailsRanked)
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
        console.log(trailObject)

        trails.push(trailObject)

        id++

        res.status(200).send(trails)
    },

    changeTrail: (req, res) => {
        const index = trails.findIndex(el => el.id === +req.params.id)
        const {type} = req.body
        if(type === 'minus' && trails[index].ranking > 1){
            trails[index].ranking--
        }else if(type === 'plus' && trails[index].ranking < 5){
            trails[index].ranking++
        }else{
            res.status(400).send('Your rating is to low or to high. It cannot be better than 5 or worse than 1')
        }
        res.status(200).send(trails)
    },
    
    deleteTrail: (req, res) => {
        const index = trails.findIndex(el => el.id === +req.params.id)
        
        trails.splice(index, 1)
        
        res.status(200).send(trails)
    },
    
    // changeTrailName: (req,res) => {
    //     const index = trails.findIndex(el => el.id === +req.params.id)
    //     const {name} = req.body
    //     trails[index].trailName === name

    //     res.status(200).send(trails)
    // }

    changeTrailName: (req, res) => {
        const index = trails.findIndex(el => el.id === +req.params.id)
        const {newName, newLength, newLocation, newLikeIt} = req.body
        trails[index] = {
            trailName: newName || trails[index].trailName,
            trailLength: newLength || trails[index].trailLength,
            trailLocation: newLocation || trails[index].trailLocation,
            likeIt: newLikeIt || trails[index].likeIt,
            ranking: trails[index].ranking,
            id: trails[index].id
        }

        console.log(trails[index])
        res.status(200).send(trails)

    }
}