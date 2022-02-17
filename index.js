const express = require('express');
const path = require('path');

const HttpError = require('./helpers/http-error');
const userRoutes = require('./routes/user-routes');
const projectRoutes = require('./routes/project-routes');
const expenseRoutes = require('./routes/expense-routes');
const estimateRoutes = require('./routes/estimate-routes');

const app = express();

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.use('/api/user', userRoutes);

app.use('/api/project', projectRoutes);

app.use('/api/expense', expenseRoutes);

app.use('/api/estimate', estimateRoutes);

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