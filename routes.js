const express = require('express')
const router = express.Router()
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});


router.get('/movies', (req, res) => {
  const movies = db.get('movies');
  res.json(movies);
})

router.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = db.get('movies')
    .find({title: id})
  res.send(movie)
})

router.post('/movies', (req, res) => {
  db.get('movies')
    .push(newMovieObj)
    .write()
    .then(newMoviObj => {
      res.status(201).send(newMovieObj)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
