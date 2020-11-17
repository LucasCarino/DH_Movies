const { body } = require('express-validator');
const path = require('path');

module.exports = {
    movie: [
        body('title').notEmpty()
            .withMessage('El titulo de la película es un campo obligatorio'),
        body('rating').notEmpty()
            .withMessage('El rating de la película es un campo obligatorio')
            .isFloat()
            .withMessage('El rating de la película debe ser un número'),
        body('awards').notEmpty()
            .withMessage('La cantidad de premios de la película es un campo obligatorio')
            .isInt()
            .withMessage('La cantidad de premios de la película debe ser un número'),
        body('genre_id').isLength({ min: 1 })
            .withMessage('Debes seleccionar un género'),
        body('actors').isLength({ min: 1 })
            .withMessage('Debes seleccionar al menos un actor'),
        body('release_date').notEmpty()
            .withMessage('Debes seleccionar una fecha valida')
    ]
}