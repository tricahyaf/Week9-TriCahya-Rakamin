const { findAllmovies, getmovieById, createNewmovie, updatemovie, destroymovie } = require ('../controller/movie.controller')

const router = require('express').Router()

router.get('/movie', findAllmovies)
router.get('/movie/:id', getmovieById)
router.post('/movie', createNewmovie)
router.put('/movie/:id', updatemovie)
router.delete('/movie/:id', destroymovie)

module.exports = router