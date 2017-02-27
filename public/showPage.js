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

})
