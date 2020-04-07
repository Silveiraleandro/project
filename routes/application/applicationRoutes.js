const express  = require('express');
const router  = express.Router();

// Controller
const applicationController = require('./../../controllers/application/applicatinController');

router.get('/', applicationController.home);

module.exports = router;
