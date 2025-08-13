const getSlots = require('slot-calculator');
const {Settings} = require('luxon');
const {dbIDLength, fromStart, toEnd, mIntervals} = require('../config/dbIDLength');
const Volunteer = require('../model/Volunteer');
const compareAsc = require('date-fns');
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


 const updateVolunteerAvailability = async (req, res) =>{
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter is required.'});
    }

    if(!req.body.i){
        return res.status(400).json({'message': 'i: index parameter is required.'})
    }

    const volunteer = await Volunteer.findOne({_id: req.body.id}).exec();
    if (!volunteer){
        return res.status(204).json({'message': `No volunteer matches the ID ${req.body.id}`});
    }
    if(req.body.i > volunteer.availability.length || req.body.i < 0){
        return res.status(400).json({'message': 'i: index parameter must be within bounds of current availability or one above.'})
    }
    
    //Checks if from:date comes before to:date
    if(compareAsc.compareAsc(req.body.from, req.body.to) !== -1){
        return res.status(400).json({'message': `Start date, from: ${req.body.from} has to come after the end date, to: ${req.body.to}`})
    }
    
    //Adds a new availability if the new index = the next index spot
    if(req.body.i === volunteer.availability.length){
        const result = await Volunteer.updateOne(
            { _id: req.body.id },
            { $push: { availability: { from: req.body.from, to: req.body.to } } }
        );
        res.json(result);
    }
    //Updates new availability into the old one.
    else{
        const updateFields = {};
        if(req.body?.from) updateFields['availability.' + req.body.i + '.from'] = req.body.from;
        if(req.body?.to) updateFields['availability.' + req.body.i + '.to'] = req.body.to;
        const result = await Volunteer.updateOne(
            { _id: req.body.id },
            { $set: updateFields }
        );
        res.json(result);
    }
    };

const getVolunteerAvailability = async (req, res) => {
    if (!req?.params?.id || req.params.id.length !== dbIDLength) return res.status(400).json({ 'message': 'Volunteer ID required' })
    const volunteer = await Volunteer.findOne({ _id: req.params.id }).exec();
    if (!volunteer) {
        return res.status(204).json({ 'message': `No volunteer matches the ID${req.body.id}` })
    }
    res.json(volunteerSlots(volunteer));
}

module.exports = {
    updateVolunteerAvailability,
    getVolunteerAvailability
}

