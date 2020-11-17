const { Movie, Genre, Actor } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    showAll: async (req, res) => {
        try {
            const actors = await Actor.findAll({
                order: [
                    ['first_name', 'ASC']
                ]
            });
            await res.render('actors/actors', { actors: actors, title: 'Actores' });
        } catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res) => {
        try {
            const actor = await Actor.findByPk(req.params.id, { include: ['favoriteMovie'] });
            await res.render('actors/detail', { actor, title: actor.first_name + ' ' + actor.last_name });
        } catch (err) {
            console.log(err);
        }
    }
}