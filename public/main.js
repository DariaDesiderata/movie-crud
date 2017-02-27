var $movieTable = $('.movie-table')

function createMovies(movies) {
  movies.forEach((movie, i) => {
    $movieTable.append(
      `<tr class="movieDetails" id="${i}">
      <td class="title"><a href="/show/${movie.title}">${movie.title}</a></td>
      <td class="director">${movie.director}</td>
      <td class="year">${movie.year}</td>
      <td class="rating">${movie.rating}</td>
      <td class="delete"><button class="delete btn waves-effect red lighten-2 waves-light" name="action">Delete Movie</button></td>
      <td class="edit"><button class="edit btn waves-effect waves-light" name="action">Edit</button></td>
      </tr>`
    )
  })
}
//add a new movie on click of NewMovie button
var $newMovieButton = $('.add-new')
$newMovieButton.on('click', function() {

  var newMovie = {
    title: $('#title').val(),
    director: $('#director').val(),
    year: $('#year').val(),
    rating: $('#rating').val(),
    posterURL: $('#url').val()
  }

  $.ajax("/movies", {
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newMovie)
    })
    .then(result => {
      if(result == "Post successful") {
        window.location.href = "/index.html"
      }
    })
    .catch(err => console.log(err))

})

//edit a movie based on click of edit
function editMovie() {
  var $edit = $('.edit')
  $edit.on('click', function() {
    const currentMovie = $(this).parent('tr').children(':first-child').text()
    window.location = "/edit/" +currentMovie
  })

}
//delete movie
function deleteMovie() {

  $('.delete').click(function() {
    const $currentTr = $(this).parent('tr')
    const currentMovie = $currentTr.children(':first-child').text()
    var path = "/movies/" + currentMovie
    console.log(path);
    $.ajax(path, {
      method: "DELETE",
      success: function() {
        console.log("Successfully deleted movie");
        }
      })
      .then($currentTr.remove())
  })
}

$.get("/movies")
  .then(createMovies)
  .then(editMovie)
  .then(deleteMovie)
  .catch(err => {
    console.log(err)
})
