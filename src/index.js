let addToy = false;
const toyCollection = document.getElementById('toy-collection')
const toyForm = document.getElementsByClassName('add-toy-form')[0]


// FETCH Requests
function initialize() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(renderToys))
}

initialize()

function addNewToy(e) {
  e.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': e.target[0].value,
      'image': e.target[1].value,
      'likes': 0
    }),
  })
  .then(resp => resp.json())
  .then(data => renderToys(data))
}

toyForm.addEventListener('submit', addNewToy)

function addNewLikes(e) {
  let likes = (e.path[1].querySelector('p').querySelector('span').innerText)
  likes++
  fetch(`http://localhost:3000/toys/${e.path[1].id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'likes': likes
    }),
  })
  e.path[1].querySelector('p').querySelector('span').innerText = likes
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toys) {
  let eachToy = document.createElement('div')
  eachToy.setAttribute('class', 'card')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')

  toyCollection.appendChild(eachToy)
  eachToy.appendChild(h2)
  eachToy.appendChild(img)
  eachToy.appendChild(p)
  eachToy.appendChild(btn)

  eachToy.id = toys.id
  h2.textContent = toys.name
  img.src = toys.image
  p.innerHTML = `<span>${toys.likes}</span> Likes`
  btn.setAttribute('id', `${toys.id}`)
  btn.textContent = 'Like'

  btn.addEventListener('click', addNewLikes)
}

