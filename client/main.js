const baseURL = 'http://localhost:4567'

const trailDisplay = document.querySelector('#trailDisplay')
const trailsBtn = document.querySelector('#submit')
const hideTrailBtn = document.querySelector('#hideTrailBtn')
const inputs = document.querySelector('#allInputs')

//Axios request to get trails array
//loop over that array
// create trails card  for each item in array
const displayTrails = (array) => {
    for(i = 0; i < array.length; i++) {
        createTrailCard(array[i])
    }
}

const createTrailCard = (trail) => {
    const trailCard = document.createElement('section')
    trailCard.classList.add('trail-card')
    
    trailCard.innerHTML = `
    <p>${trail.trailName}</p>
    <p>${trail.trailLength}</p>
    <p>${trail.trailLocation}</p>
    <p>Was it a good trail? ${trail.likeIt}</p>
    <p>${trail.ranking} / 5 stars</p>
    <button onclick="trailRating(${trail.id}, 'plus')">Increase</button>
    <button onclick="trailRating(${trail.id}, 'minus')">Decrease</button>
    <button onclick="deleteTrail(${trail.id})")>delete</button> 
    <button>Edit Trail</button>
    <br><br>
    `
    trailDisplay.appendChild(trailCard)
}
const getTrails = () => {
    const hideTrails = document.createElement('section')
    hideTrails.innerHTML = `<button>Hide Trails</button>
    <a href='https://www.trailforks.com/region/utah-county/'><button>Find more trails nearby</button></a>`
    hideTrailBtn.appendChild(hideTrails)
    hideTrails.addEventListener('click', hideAllTrails)
    axios.get(`${baseURL}/showTrails`)
    .then((response) => {
        displayTrails(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteTrail = (id) => {
    axios.delete(`${baseURL}/deleteTrail/${id}`)
    .then((response) => {
        trailDisplay.innerHTML =''
        displayTrails(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
}

const trailRating = (id, type) => {
    axios.put(`${baseURL}/changeTrailRating/${id}`, {type: type})
    .then((response) => {
        trailDisplay.innerHTML =''
        displayTrails(response.data)
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const createTrail = (event) => {
    event.preventDefault()
    let trailName = document.querySelector("#trailName") 
    let trailLength = document.querySelector("#trailLength") 
    let trailLocation = document.querySelector("#trailLocation") 
    let didJaLikeIt = document.querySelector("#didJaLikeIt") 
    let radioBtns = document.querySelector("input[name='radio']:checked") 
    
    console.log(radioBtns)
    let newTrail = {
        trailName: trailName.value,
        trailLength: trailLength.value,
        trailLocation: trailLocation.value,
        likeIt: didJaLikeIt.checked,
        ranking: radioBtns.value
    }
    
    axios.post(`${baseURL}/addTrails`, newTrail)
    .then((res) => {
        trailDisplay.innerHTML = ''
        trailName.value = ''
        trailLength.value = ''
        trailLocation.value = ''
        didJaLikeIt.checked = false
        radioBtns.checked = false
        displayTrails(res.data)
        console.log(res.data)
    })
    .catch(err => console.log(err))
    
}
// const changeTrailName = (id) => {
//     const nameChange = document.querySelector('#nameChange')
//     nameChange.addEventListener('submit', changeTrailName)

//     axios.put(`${baseURL}/changeTrailName/${id}`,{trailName:newName})
//     .then((response) => {
//         trailDisplay.innerHTML =''
//         displayTrails(response.data)
//         console.log(response.data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// const hideTrails = () => {
//     const hideTrailsCard = document.createElement('button')
//     hideTrailsCard.setAttribute('class', 'hide-trails')
//     hideTrailBtn.appendChild(hideTrailsCard)
//     hideTrailsCard.addEventListener('onclick', () => {
//         trailDisplay.innerHTML = ''
//     })
// }

const hideAllTrails = () => {
    trailDisplay.innerHTML = ''
    hideTrailBtn.innerHTML = ''
    trailsBtn.style.display = 'inline'
}

trailsBtn.addEventListener('click', getTrails)
inputs.addEventListener('submit', createTrail)
trailsBtn.addEventListener('click', () => {
    trailsBtn.style.display = 'none'
})
