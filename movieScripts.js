document.addEventListener('DOMContentLoaded', () => {
console.log('Hiya gorgeous!')

//get movies from database
//print them to screen
//put information in appropriate columns in the table
let tbody = document.getElementById('body')

axios.get('http://localhost:3000/movies')
.then(function(response) {
  // console.log(response)

  response.data.forEach((movie) => {
    let tr = document.createElement('tr')
    let title = document.createElement('td')
    let director = document.createElement('td')
    let year = document.createElement('td')
    let rating = document.createElement('td')
    let poster_url = document.createElement('td')
    let link = document.createElement('a')


    title.innerText = movie.title
    director.innerText = movie.director
    year.innerText = movie.year
    rating.innerText = movie.rating
    link.textContent = "Link to Movie Poster"
    link.href = movie.poster_url
    poster_url.appendChild(link)

    tr.appendChild(title)
    tr.appendChild(director)
    tr.appendChild(year)
    tr.appendChild(rating)
    tr.appendChild(poster_url)
    tbody.appendChild(tr)
  })
})




})
