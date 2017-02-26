var $movieTable = $('.movie-table')

function createMovies(result) {
  movies = result.movies;
  movies.forEach(movie => {
    $movieTable.append(
      `<td class="title">${movies.title}</td>
      <td class="director">${movies.director}</td>
      <td class="year">${movies.year}</td>
      <td class="rating">${movies.rating}</td>
      <td class="delete"><button class="delete btn waves-effect waves-light" name="action">Delete Movie</button></td>
      <td class="edit"><button class="delete btn waves-effect waves-light" name="action">Edit</button></td>`
    )
  })
}
var $newMovie = $('.new')
$newMovie.on('click', function() {
  $.get('/newMovie')
    .then()
})

$.get('/movies')
.then(function(result) {console.log(result)})
.catch(err => {
  console.log(err)
})
