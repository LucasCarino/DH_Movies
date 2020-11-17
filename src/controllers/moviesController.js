const { Movie, Genre, Actor } = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
    showAll: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                order: [
                    ['title', 'ASC']
                ]
            });
            await res.render('movies/movies', { movies: movies, title: 'Peliculas' });
        } catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res) => {
        try {
            const movie = await Movie.findByPk(req.params.id, { include: ['Genres'] });
            await res.render('movies/detail', { movie: movie, title: movie.title });
        } catch (err) {
            console.log(err);
        }
    },
    new: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                order: [
                    ['release_date', 'DESC'],
                ],
                limit: 5
            })
            res.render('movies/new', { movies: movies, title: 'Lanzamientos' });
        } catch (err) {
            console.log(err)
        }
    },
    recommended: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                where: {
                    rating: {
                        [Op.gt]: 8
                    }
                }
            })
            res.render('movies/recommended', { movies: movies, title: 'Recomendaciones' });
        } catch (err) {
            console.log(err)
        }
    },
    search: async (req, res) => {
        let moviesResults = req.body.results;
        try {
            moviesResults = await Movie.findAll({
                where: {
                    title: { [Op.like]: '%' + moviesResults + '%' }
                }
            })
            res.render('movies/search', { moviesResults: moviesResults, title: 'Resultado de tu busqueda' });
        } catch (err) {
            console.log(err)
        }
        res.send(moviesResults);
    },
    edit: async (req, res) => {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId, { include: ['Genres', 'Actors'] });
        const genres = await Genre.findAll();
        const actors = await Actor.findAll();
        res.render('movies/edit', { movie, genres, actors, title: 'Editando' + ' ' + movie.title })
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const movieId = req.params.id;
            const updatedMovie = await Movie.findByPk(movieId, { include: ['Genres', 'Actors'] });
            await updatedMovie.removeActors(updatedMovie.actors);
            await updatedMovie.addActors(req.body.actors);
            await updatedMovie.update(req.body);
            res.redirect('/movies/detail/' + req.params.id)
        } else {
            const movieId = req.params.id;
            const movie = await Movie.findByPk(movieId, { include: ['Genres', 'Actors'] });
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('movies/edit', { movie, genres, actors, title: 'Editando' + ' ' + movie.title, errors: errors.errors })
        }
    },
    destroy: async (req, res) => {
        try {
            const movieId = req.params.id;
            const deletedMovie = await Movie.findByPk(movieId, { include: ['Genres', 'Actors'] });
            // res.send(deletedMovie);
            await deletedMovie.removeActors(deletedMovie.actors);
            await deletedMovie.destroy()
            res.redirect('/movies')
        } catch (err) {
            console.log(err);
        }
    }
}