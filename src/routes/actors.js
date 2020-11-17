const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/', actorsController.showAll);
router.get('/detail/:id', actorsController.detail);
module.exports = router;