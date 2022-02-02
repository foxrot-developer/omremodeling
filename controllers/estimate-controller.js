const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../helpers/db-config');
const HttpError = require('../helpers/http-error');

const allEstimates = async (req, res, next) => {
    const getEstimates = "SELECT descripcion, monto FROM presupuestos;"
    db.query(getEstimates, (err, response) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error fetching data. Try again!', 500));
        }

        if (!response || !response.length) {
            return next(new HttpError('No records found!', 404));
        }

        res.json({ estimates: response });
    });
};

exports.allEstimates = allEstimates;