const express = require('express');
const { check } = require('express-validator');

const expenseController = require('../controllers/expense-controller');
const fileUpload = require('../helpers/file-upload');

const router = express.Router();

router.get('/all', expenseController.allExpenses);

router.post('/add', fileUpload.single('expenseImage'), [
    check('id_proyect').not().isEmpty().isInt(),
    check('user').not().isEmpty().isInt(),
    check('description').not().isEmpty(),
    check('created_date').not().isEmpty().isDate(),
    check('description').not().isEmpty(),
    check('quantity').not().isEmpty().isFloat()
], expenseController.addExpense);


module.exports = router;