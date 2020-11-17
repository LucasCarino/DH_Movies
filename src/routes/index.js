const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const validator = require('../middlewares/routeMiddlewares/validator');

router.get('/', indexController.main);
router.get('/create', indexController.create);
router.post('/create', validator.movie, indexController.store);
module.exports = router;
