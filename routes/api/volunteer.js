const express = require('express');
const router = express.Router();
const volunteerController = require('../../controllers/volunteerController');

router.route('/:id')
    .get(volunteerController.getEmployee);

module.exports = router;