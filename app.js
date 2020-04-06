const express = require('express');
// MIDDLEWARE IMPORTS
const morgan = require('morgan');
const cors = require('cors');
// ROUTER IMPORTS
const authRoutes = require('./routes/api/v1/authRoutes');

const app = express();

// MIDDLEWARE
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

// API ROUTES
app.use('/api/v1/auth', authRoutes);

module.exports = app;
