const baseURL = 'http://localhost:4567'

const trailDisplay = document.querySelector('#trailDisplay')
const trailsBtn = document.querySelector('#submit')
const hideTrailBtn = document.querySelector('#hideTrailBtn')
const inputs = document.querySelector('#allInputs')
const modalBg = document.querySelector('.modal')

let trailToEdit = null

//Axios request to get trails array
//loop over that array
// create trails card  for each item in array
const displayTrails = (array) => {
    for(i = 0; i < array.length; i++) {
        createTrailCard(array[i])
    }
    const modalClose = document.querySelector('.modal-close')
    
    
    modalClose.addEventListener('click', () => {
        modalBg.classList.remove('bg-active')
    })
}

const createTrailCard = (trail) => {
    const trailCard = document.createElement('section')
    trailCard.classList.add('trail-card')
    
    trailCard.innerHTML = `
    <div class="trail-card-content">
    <h3> Trail: </h3>
    <p>${trail.trailName}</p>
    <p>${trail.trailLength}</p>
    <p>${trail.trailLocation}</p>
    <p>Enjoyable? ${trail.likeIt}</p>
    <p>${trail.ranking} / 5 stars</p>
    <div id="buttonContainer">
    <button onclick="trailRating(${trail.id}, 'plus')">Increase</button>
    <button onclick="trailRating(${trail.id}, 'minus')">Decrease</button>
    <button onclick="deleteTrail(${trail.id})")>delete</button>
    <button class="edit-button">Edit Trail</button>
    </div>
    </div>
    <br><br>
    `
    trailDisplay.appendChild(trailCard)
    
    const editButtons = document.querySelectorAll('.edit-button')

    const editButton = editButtons[editButtons.length - 1]    
    editButton.addEventListener('click', () => {    
        trailToEdit = trail.id
        modalBg.classList.add('bg-active')
    })
}
const modalForm = document.querySelector('#modalForm')

modalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    updateTrails(trailToEdit)
})

const getTrails = () => {
    const hideTrails = document.createElement('section')
    hideTrails.innerHTML = `<button>Hide Trails</button>
    <a href='https://www.trailforks.com/region/utah-county/'><button>Find more trails nearby</button></a>`
    hideTrailBtn.appendChild(hideTrails)
    hideTrails.addEventListener('click', hideAllTrails)
    axios.get(`/showTrails`)
    .then((response) => {
        displayTrails(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteTrail = (id) => {
    axios.delete(`/deleteTrail/${id}`)
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
    axios.put(`/changeTrailRating/${id}`, {type: type})
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
    
    axios.post(`/addTrails`, newTrail)
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
    trailsBtn.style.display ='none' 
    const hideTrails = document.createElement('section')
    hideTrails.innerHTML = `<button>Hide Trails</button>
    <a href='https://www.trailforks.com/region/utah-county/'><button>Find more trails nearby</button></a>`
    hideTrailBtn.appendChild(hideTrails)
    hideTrails.addEventListener('click', hideAllTrails)
    
}

const hideAllTrails = () => {
    trailDisplay.innerHTML = ''
    hideTrailBtn.innerHTML = ''
    trailsBtn.style.display = 'inline'
    editButton.style.display = 'none'
}

const updateTrails = (id) => {

    const newName = document.querySelector("#newName")
    const newLength = document.querySelector("#newLength")
    const newLocation = document.querySelector("#newLocation")
    const newLikeIt = document.querySelector("#newLikeIt")
    const modalBg = document.querySelector('.modal')


    let updatedTrail = {
        newName: newName.value,
        newLength: newLength.value,
        newLocation: newLocation.value,
        newLikeIt: newLikeIt.checked
    }
    console.log(id)

    axios.put(`/changeTrailName/${id}`, updatedTrail )
    .then((res) => {
        trailDisplay.innerHTML = ''
        newName.value = ''
        newLength.value = ''
        newLocation.value = ''
        newLikeIt.checked = false
        displayTrails(res.data)
        console.log(res.data)
        modalBg.classList.remove('bg-active')
    })
    .catch(err => console.log(err))
}


trailsBtn.addEventListener('click', getTrails)
inputs.addEventListener('submit', createTrail)
trailsBtn.addEventListener('click', () => {
    trailsBtn.style.display = 'none'
})
