const express = require('express');
const router = express.Router();
const campusController = require('../../controller/campusesController');

router.route('/')
    .get(campusController.getAllCampusesAvailability);

module.exports = router;