const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../helpers/db-config');
const HttpError = require('../helpers/http-error');

const allExpenses = async (req, res, next) => {
    const allExpenses = "SELECT description, precio_real FROM gastos;"
    db.query(allExpenses, (err, response) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error fetching data', 500));
        }
        if (!response || !response.length) {
            return next(new HttpError('No records found', 404));
        }

        res.json({ expenses: response });
    });
};

exports.allExpenses = allExpenses;