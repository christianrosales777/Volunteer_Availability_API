const express = require('express');
const router = express.Router();
const volunteerController = require('../../controller/volunteersController');


router.route('/:id')
    .get(volunteerController.getVolunteerAvailability);

module.exports = router;