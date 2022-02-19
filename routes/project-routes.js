const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../helpers/file-upload');

const projectController = require('../controllers/project-controller');

const router = express.Router();

router.get('/', projectController.allProjects);

router.post('/add-extra-work', fileUpload.single('workImage'), [
    check('user_id').not().isEmpty().isInt(),
    check('project_id').not().isEmpty().isInt(),
    check('description').optional({ checkFalsy: true }),
    check('image_description').not().isEmpty(),
], projectController.addExtraWork);

module.exports = router;