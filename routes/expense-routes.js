const express = require('express');
const { check } = require('express-validator');

const expenseController = require('../controllers/expense-controller');

const router = express.Router();

router.get('/all', expenseController.allExpenses);


module.exports = router;