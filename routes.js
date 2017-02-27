const express = require('express')
const router = express.Router()
const low = require('lowdb')
const path = require('path')
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/public/landing.html'))
})


router.get('/movies', (req, res) => {
  const movies = db.get('movies')
  res.send(movies);
})

router.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = db.get('movies')
    .find({title: id})
  res.send(movie)
})

router.get('/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/edit.html'))
})

router.post('/movies', (req, res) => {
  db.get('movies')
    .push(req.body)
    .write()
    .then(response => {
      res.status(201).send("Post successful")
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/movies/:id', (req, res) => {
  const id = req.params.id
  db.get('movies')
    .find({title: id})
    .assign(req.body)
    .write()
    .then(update => {
      res.status(200).send("Success")
    })
    .catch(err => {
      console.log(err);
    })
})

router.delete('/movies/:id', (req, res) => {
  const id = req.params.id
  db.get('movies')
    .remove({title: id})
    .write()
    .then(deletedMovie => {
      res.status(204).send()
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router
