const { validationResult } = require('express-validator');

const db = require('../helpers/db-config');
const HttpError = require('../helpers/http-error');

const allProjects = (req, res, next) => {
    const getProjects = 'SELECT nombre FROM proyecto';
    db.query(getProjects, (err, result) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error occured while fetching projects from database', 500));
        }
        res.json({ projects: result });
    });
}

const addExtraWork = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid data received', 422));
    }

    const { user_id, project_id, description, image_description } = req.body;

    const newExtraWork = "INSERT INTO extra_work (user_id, project_id, description, image, image_description) VALUES (?, ?, ?, ?, ?);"
    db.query(newExtraWork, [user_id, project_id, description, req.file.path, image_description], (err, response) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error adding data to database', 500));
        }

        res.status(201).json({ message: 'Extra work added successfully' });
    });
};

exports.allProjects = allProjects;
exports.addExtraWork = addExtraWork;