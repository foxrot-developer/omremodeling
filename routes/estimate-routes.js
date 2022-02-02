const express = require('express');
const { check } = require('express-validator');

const estimateController = require('../controllers/estimate-controller');

const router = express.Router();

router.get('/all', estimateController.allEstimates);

module.exports = router;