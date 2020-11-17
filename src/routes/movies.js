const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const validator = require('../middlewares/routeMiddlewares/validator');

router.get('/', moviesController.showAll);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recommended);
router.post('/search', moviesController.search);
router.get('/detail/:id', moviesController.detail);
router.get('/edit/:id', moviesController.edit);
router.put('/edit/:id', validator.movie, moviesController.update);
router.delete('/delete/:id', moviesController.destroy);
module.exports = router;