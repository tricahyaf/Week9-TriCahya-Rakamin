const {movie} = require("../models");

const findAllmovies = async (req, res) => {
    try {
        const data = await movie.findAll()

        const result = {
            status: 'ok',
            data: data
        }

        res.json(result)
    } catch (error) {
        console.log(error, '<<< error find all movie')
    }
}

const getmovieById = async (req, res) => {
    const id = req.params

    let movie
    
    for (let i = 0; i < movie.length; i++) {
        if (movie[i].id === Number(id)) {
            movie = movie[i]
        }
    }

    if (movie === undefined) {
        return res.status(404).json({ status: 'failed', message: `data book with id ${id} is not found`})
    }

    res.json({ status: 'ok', data: movie})
}

const createNewmovie = async (req, res) => {
    try {
        const {title,genres,year} = req.body

        const newmovie = await movie.create({title: title, genres: genres, year: year})
        res.status(201).json({
            status: 'ok',
            data: {
                id: newmovie.id,
                title: newmovie.title,
                genres: newmovie.genres,
                year: newmovie.year,
                createdAt: newmovie.createdAt,
                updatedAt: newmovie.updatedAt
            }
        })
    } catch (error) {
        console.log(error, 'error create new movie')
    }
}

const updatemovie = async (req, res) => {
    try {
        const {id} = req.params
        const { title, genres, year} = req.body
        const movie = await movie.findByPk(id)

        if (!movie) {
            return res.status(404).json({
                status: 'failed',
                message: `data movie with id ${id} is not exist`
            })
        }

        movie.title = title
        movie.genres = genres
        movie.year = year
        movie.updatedAt = new Date()

        movie.save()

        res.json({
            status:'ok',
            data: {
                id: movie.id,
                title: movie.title,
                genres: movie.genres,
                year: movie.year,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt
            }
        })
    } catch (error) {
        
    }
}

const destroymovie = async (req, res) => {
    try {
        const {id} = req.params

        const { title, genres, year} = req.body
        const movie = await movie.findByPk(id)

        if (!movie) {
            return res.status(404).json({
                status: 'failed',
                message: `data movie with id ${id} is not exist`
            })
        }

        movie.destroy()

        res.json({
            status: 'ok',
            message: `success delete movie with id ${id}`
        })
    } catch (error) {
        
    }
}

module.exports = { findAllmovies, getmovieById, createNewmovie, updatemovie, destroymovie };