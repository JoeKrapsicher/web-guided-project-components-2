// Imports at the top of the file!
// We never nest imports inside blocks of code!
import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'

function fakeRequest(arg) {
  
  return new Promise((resolve, reject) => {
    if (arg){
      return resolve({ success: true, data: {foo: "bar"}})
    }else {
      return reject({success: false, error: 'bad juju'})
    }
  })
}

const data = (fakeRequest(true))
  .then((data) => {
    console.log('inside .then', data);
    return data
  })
  .catch(err => console.log(err));

// 👉 TASK 1- Test out the following endpoints:

//  https://lambda-times-api.herokuapp.com/friends
//  https://lambda-times-api.herokuapp.com/friends/1
//  https://lambda-times-api.herokuapp.com/quotes
//  https://lambda-times-api.herokuapp.com/cards
//  https://lambda-times-api.herokuapp.com/breeds
//  https://dog.ceo/api/breeds/image/random

//  * With HTTPie (command-line HTTP Client)
//  * With Postman (HTTP Client with GUI)
//  * With Chrome and the Network Tab
//  * With JS using the native fetch [STRETCH]


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector('div.entry')


// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div')
  const image = document.createElement('img')
  const heading = document.createElement('h3')
  // setting class names, attributes and text
  heading.textContent = `Breed: ${breed}`
  image.src = imageURL
  image.classList.add('dog-image')
  dogCard.classList.add('dog-card')
  // creating the hierarchy
  dogCard.appendChild(image)
  dogCard.appendChild(heading)
  // adding some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected')
  })
  // never forget to return!
  return dogCard
}

entryPoint.appendChild(dogCardMaker( {imageURL: 'https://www.yourpurebredpuppy.com/dogbreeds/photos-CD/cairnterriersf5.jpg', breed: 'Carin Terrier'}))

// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Projects with npm: install it with npm and import it into this file


// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console

// axios.get('https://dog.ceo/api/breed/random/') //this is a Promise
// .then(data => {
//   // {... data: { messages: ['url'] } }
//   const imageURL = data.message[0];

//   entryPoint.appendChild(dogCardMaker({ imageURL: imageURL, breed: 'dauchshund'}))
// });

const getDogs = (breed, count) => {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
  .then(({data}) => {
    const imageURL = data.message[0]
    const dogCard = dogCardMaker({imageURL, breed})
    entryPoint.appendChild(dogCard)
  })
  .catch(err => console.log(err))
}

getDogs('pitbull', 1)
getDogs('chihuahua', 1)
getDogs('dachshud', 1);

// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)

const dogButton = document.querySelector('button#get-dog-btn')
// dogButton.onclick = () =>

// getDogs('dauchshud')
axios.get('https://lambda-times-api.herokuapp.com/breeds')
.then((data) => {
  console.log(data)
})
.catch((err) => console.log(err))

// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`


// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// or request them from https://lambda-times-api.herokuapp.com/breeds
// and loop over them, fetching a dog at each iteration
