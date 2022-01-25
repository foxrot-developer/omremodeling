const bcrypt = require('bcryptjs');
const express = require('express');
const { validationResult } = require('express-validator');

const db = require('../helpers/db-config');
const HttpError = require('../helpers/http-error');

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid data received', 422));
    }

    const { username, password } = req.body;

    const existingUser = 'SELECT * FROM usuarios WHERE login = ?';
    db.query(existingUser, username, async (err, result) => {
        if (err) {
            console.log(err);
            return next(new HttpError('Error occured, try again!', 500));
        }
        if (!result || !result.length) {
            return next(new HttpError('No user found against username', 404));
        }
        else {
            // let validPassword;
            // try {
            //     validPassword = await bcrypt.compare(password, result[0].password);
            // } catch (error) {
            //     return next(new HttpError('Error validating password', 500));
            // }

            // if (!validPassword) {
            //     return next(new HttpError('Password incorrect', 404));
            // }
            res.json({ user: result[0] });
        }
    });
};

const userCheckIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid data received', 422));
    }

    const { checkin_date_time, checkin_date, username, type, project } = req.body;

    // console.log({ checkin_date_time, checkin_date, username, });

    if (type === 'check-in') {
        const checkinUser = "INSERT INTO asistencia (codigo_persona, fecha_hora_Entrada, tipo, fecha) VALUES (?, ?, 'Entrada', ?)";
        db.query(checkinUser, [username, checkin_date_time, checkin_date], (err, result) => {
            if (err) {
                console.log(error);
                return next(new HttpError('Error checking-in, try again!', 500));
            }
            else {
                const selectedProject = "SELECT telefono, encargado, descripcion FROM proyecto WHERE nombre = ?;"
                db.query(selectedProject, project, async (err, project) => {
                    if (err) {
                        console.log(error);
                        return next(new HttpError('Error checking-in, try again!', 500));
                    }
                    res.json({ message: 'User check-in successful', project_details: project });
                });
            }
        });
    }
    else if (type === 'check-out') {
        const checkinUser = "INSERT INTO asistencia (codigo_persona, fecha_hora_Entrada, tipo, fecha) VALUES (?, ?, 'Salida', ?)";
        db.query(checkinUser, [username, checkin_date_time, checkin_date], async (err, result) => {
            if (err) {
                console.log(error);
                return next(new HttpError('Error checking-out, try again!', 500));
            }
            else {
                res.json({ message: 'User check-out successful' });
            }
        });
    }
    else {
        return next(new HttpError('Invalid type received', 422));
    }
};

exports.login = login;
exports.userCheckIn = userCheckIn;