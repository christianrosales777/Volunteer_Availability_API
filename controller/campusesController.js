const getSlots = require('slot-calculator');
const { Settings } = require('luxon');
const {fromStart, toEnd, mIntervals } = require('../config/dbIDLength');
const Campus = require('../model/Campus');
Settings.defaultZone = 'UTC';

const campusSlots = (campus) => {
    let avails = [];
    for (let i = 0; i < campus.length; i++) {
        for (let j = 0; j < campus[i].availability.length; j++) {
            const { availableSlots } = getSlots.getSlots({
                from: fromStart,
                to: toEnd,
                availability: [campus[i].availability[j]],
                duration: mIntervals,
            });

             if (Array.isArray(availableSlots) && availableSlots.length > 0) {
                availableSlots.forEach(slot => {
                    avails.push({
                        ...slot,
                        campusName: campus[i].campusName
                    });
                });
            }
        }


    }
    return avails;
}


const getAllCampusesAvailability = async (req, res) => {
    const campus = await Campus.find();
    if (!campus) return res.status(204).json({ 'message': 'No Campuses found.' });
    res.json(campusSlots(campus));
}

module.exports = { getAllCampusesAvailability };