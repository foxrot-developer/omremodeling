const express = require('express');
const { check } = require('express-validator');

const expenseController = require('../controllers/expense-controller');

const router = express.Router();

router.get('/all', expenseController.allExpenses);

router.post('/add', [
    check('created_date').not().isEmpty().isDate(),
    check('description').not().isEmpty(),
    check('quantity').not().isEmpty().isFloat()
], expenseController.addExpense);


module.exports = router;