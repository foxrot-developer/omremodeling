const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/login', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
], userController.login);

router.post('/check-in', [
    check('checkin_date_time').not().isEmpty().matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/),
    check('checkin_date').not().isEmpty().isDate(),
    check('username').not().isEmpty(),
    check('type').not().isEmpty(),
    check('project').not().isEmpty(),
], userController.userCheckIn);

module.exports = router;