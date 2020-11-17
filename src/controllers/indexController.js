const { Movie, Genre, Actor } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
    main: async (req, res) => {
        const movies = await Movie.findAll()
        res.render('index', { title: 'Películas Online' });
    },
    create: async (req, res) => {
        const genres = await Genre.findAll();
        const actors = await Actor.findAll();
        res.render('movies/create', { title: 'Sube tu película', genres, actors });
    },
    store: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const newMovie = await Movie.create(req.body);
            await newMovie.addActors(req.body.actors);
            res.redirect('/movies');
        } else {
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('movies/create', { title: 'Sube tu película', genres, actors, errors: errors.errors });
        }
    }
}
