const express = require('express');
const { check } = require('express-validator');

const projectController = require('../controllers/project-controller');

const router = express.Router();

router.get('/', projectController.allProjects);

module.exports = router;