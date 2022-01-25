const express = require('express');
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

exports.allProjects = allProjects;