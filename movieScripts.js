document.addEventListener('DOMContentLoaded', () => {
console.log('Hiya gorgeous!')

M.AutoInit()
newMovieSubmit()

//modal for edit initialization

//get movies from database
axios.get('http://localhost:3000/movies')
.then(function(response) {
  // console.log(response)
  //take data from get request and put into appropriate table columns
  response.data.forEach((movie) => {
    //create table and button elements
    let tbody = document.getElementById('body')
    let tr = document.createElement('tr')
    let title = document.createElement('td')
    let director = document.createElement('td')
    let year = document.createElement('td')
    let rating = document.createElement('td')
    let poster_url = document.createElement('td')
    let poster = document.createElement('img')
    let link = document.createElement('a')
    let delTd = document.createElement('td')
    let delButton = document.createElement('button')
    let editTd = document.createElement('td')
    let editButton = document.createElement('button')

    //set text of created elements
    editButton.innerText = "Edit"
    delButton.innerText = "Delete"
    title.innerText = movie.title
    director.innerText = movie.director
    year.innerText = movie.year
    rating.innerText = movie.rating
    link.textContent = "Link to Movie Poster"
    link.href = movie.poster_url
    poster_url.appendChild(link)

    //append the created elements to the appropriate place
    tr.appendChild(title)
    tr.appendChild(director)
    tr.appendChild(year)
    tr.appendChild(rating)
    tr.appendChild(poster_url)
    tr.appendChild(delTd)
    delTd.appendChild(delButton)
    tr.appendChild(editTd)
    editTd.appendChild(editButton)
    poster_url.appendChild(poster)
    tbody.appendChild(tr)

    //edit button event listener and functionality
    editButton.setAttribute('editB-id', movie.id)
    editButton.addEventListener('click', (ev) => {
      console.log('edit clicked')
      body.childNodes.forEach((row) => {
          if(row.getAttribute('id') != movie.id){
            row.style.display = "none"
          }
      })
      let etitle = document.getElementById('editTitle')
      let edirector = document.getElementById('editDirector')
      let eyear = document.getElementById('editYear')
      let erating = document.getElementById('editRating')
      let poster = document.getElementsByClassName('poster-image')[0];
      let img = document.createElement('img');
      img.setAttribute('src', movie.poster_url);
      poster.appendChild(img);
      let eposter_url = document.getElementById('editPoster_url')


      etitle.value = movie.title
      edirector.value = movie.director
      eyear.value = movie.year
      erating.value = movie.rating
      eposter_url.value = movie.poster_url

      let editSubmit = document.getElementById('editForm')
      editSubmit.setAttribute('postId', movie.id)

      editSubmit.addEventListener('submit', (ev) => {
          let movieId = ev.target.getAttribute('postId')
        console.log('submit clicked')
        ev.preventDefault()

        axios.put(`http://localhost:3000/movies/${movieId}`, {

        title: etitle.value,
         director: edirector.value,
         year: eyear.value,
         rating: erating.value,
         poster_url: eposter_url.value
        })
        .then(function(response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      })

    })


    delButton.setAttribute('movie-id', movie.id)
      delButton.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('movie-id')

        //Delete the movie
        axios.delete(`http://localhost:3000/movies/${movieId}`)
        .then( (response) => {
          console.log(response)
          setTimeout(function(){ev.target.parentElement.parentElement.remove()}, 600)
        })
        .catch((error) => {
          console.log(error)
        })
      })
  })
})
const title = document.getElementById('title')
const director = document.getElementById('director')
const year = document.getElementById('year')
const rating = document.getElementById('rating')
const poster_url = document.getElementById('poster_url')


function newMovieSubmit() {
  let form = document.getElementById('form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    axios.post('http://localhost:3000/movies',{
      title: title.value,
      director: director.value,
      year: year.value,
      rating: rating.value,
      poster_url: poster_url.value
    })
    .then(function(response) {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}



})
