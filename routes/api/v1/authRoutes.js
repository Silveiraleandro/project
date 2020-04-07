const express  = require('express');
const router  = express.Router();

// Controller
const auth = require('../../../controllers/api/v1/authController');

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
