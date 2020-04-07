const express = require('express');
// MIDDLEWARE IMPORTS
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// ROUTER IMPORTS
const authRoutes = require('./routes/api/v1/authRoutes');

const app = express();

// MIDDLEWARE
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet()); // Secure http headers https://npmjs.com/package/helmet
app.use(cors()); // CORS -> Cross-origin resource sharing https://www.npmjs.com/package/cors
app.use(express.json()); // JavaScript Object Notation for api requests response

// API ROUTES
app.use('/api/v1/auth', authRoutes);

// ERRORS
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
