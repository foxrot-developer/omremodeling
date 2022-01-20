require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const HttpError = require('./helpers/http-error');

const app = express();

const db = mysql.createPool({
    host: process.env.DB_HOST_FREE,
    user: process.env.DB_USER_FREE,
    password: process.env.DB_PASSWORD_FREE,
    database: process.env.DB_NAME_FREE
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, lang');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.get('/api/projects', (req, res, next) => {
    const getProjects = 'SELECT * FROM proyecto';
    db.query(getProjects, (err, result) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error occured while fetching projects from database', 500));
        }
        res.json({ projects: result });
    });
});

app.use((req, res, next) => {
    throw new HttpError('Route is not valid', 404);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured' });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Connected');
});