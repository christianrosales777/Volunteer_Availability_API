const getSlots = require('slot-calculator');
const {DateTime, Settings} = require('luxon');
const {dbIDLength, fromStart, toEnd, mIntervals} = require('../config/dbIDLength');
const Volunteer = require('../model/Volunteer');
Settings.defaultZone = 'UTC';

//Iterates to obtained available time slots from Mongo
const volunteerSlots = (volunteer) => {
let avails = [];
    for(let i = 0; i < volunteer.availability.length; i++)
    {
      const { availableSlots } = getSlots.getSlots({
        from: fromStart,
        to: toEnd,
        availability: [volunteer.availability[i]],
        duration: mIntervals,
    });
    if (availableSlots != {}) avails.push(availableSlots) 
    }

    return avails;
}

const getVolunteerAvailability = async (req, res) => {
    if (!req?.params?.id || req.params.id.length !== dbIDLength) return res.status(400).json({ 'message': 'Volunteer ID required' })
    const volunteer = await Volunteer.findOne({ _id: req.params.id }).exec();
    if (!volunteer) {
        return res.status(204).json({ 'message': `No volunteer matches the ID${req.body.id}` })
    }

    res.json(volunteerSlots(volunteer));
}






module.exports = {
    getVolunteerAvailability
}

