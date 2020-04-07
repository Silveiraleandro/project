const express  = require('express');
const router  = express.Router();

// Controller
const applicationController = require('./../../controllers/application/applicatinController');

router.get('/', applicationController.home);
router.get('/login', applicationController.login);

module.exports = router;
