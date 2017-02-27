$(document).ready(function() {

  var urlArr = window.location.pathname.split('/')
  var title = urlArr[urlArr.length-1]
  var url = '/movies/'+ title
  function parseMovie(movie) {
    $('#title').val(movie.title)
    $('#director').val(movie.director)
    $('#year').val(movie.year)
    $('#rating').val(movie.rating)
    $('#url').val(movie.posterURL)
    $('.poster').attr("src", movie.posterURL)
  }

  $.get(url)
    .then(parseMovie)
    .catch(err => {
      console.log(err)
    })

    $('.edit-movie').on('click', function() {
      var changedMovie = {}
      changedMovie.director = $('#director').val()
      changedMovie.year = $('#year').val()
      changedMovie.rating = $('#rating').val()
      changedMovie.posterURL = $('#posterURL').val()

      $.ajax(url, {
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(changedMovie),
      success: function() {
        console.log("Success");
        }
      })
      .then(window.location.href = "/index.html")
      })
})
