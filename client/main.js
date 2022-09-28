const baseURL = 'http://localhost:4567'

const trailDisplay = document.querySelector('#trailDisplay')
const trailsBtn = document.querySelector('#submit')

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
        <p>${trail.likeIt}</p>
        <section>
            <button>Add</button>
            <p>${trail.ranking}</p>
            <button>Decrease</button>
        </section>
        <button>delete</button>
        <br><br>
    `
    trailDisplay.appendChild(trailCard)
}

const getTrails = () => {
    axios.get(`${baseURL}/showTrails`)
    .then((response) => {
        displayTrails(response.data)
            console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
}
