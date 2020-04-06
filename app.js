const express = require('express');
// MIDDLEWARE IMPORTS
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// MIDDLEWARE
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

// ROUTES

module.exports = app;
