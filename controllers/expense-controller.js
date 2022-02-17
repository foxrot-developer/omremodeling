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

const addExpense = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid data received', 422));
    }

    const { description, quantity, created_date, id_proyect, user } = req.body;

    const addExpense = "INSERT INTO gastos (description, precio_previsto, precio_real, diferencia, created_at) VALUES (?, ?, ?, ?, ?);"
    db.query(addExpense, [description, quantity, quantity, (quantity - quantity), created_date], (err, response) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error adding expense. Try again!', 500));
        }

        const photoRecord = "INSERT INTO photos (photo, expense_id, id_proyect, user) VALUES (?, ?, ?, ?);"
        db.query(photoRecord, [req.file.path, response.insertId, id_proyect, user], (err, resp) => {
            if (err) {
                console.log(err);
                return next(new HttpError('Error creating photo record', 500));
            }


            res.status(201).json({ message: 'Expense added successfully' });
        });

    });
};

exports.allExpenses = allExpenses;
exports.addExpense = addExpense;