const getSlots = require('slot-calculator');
const {DateTime, Settings} = require('luxon');
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
    if(req.body.i > volunteer.availability.length - 1 || req.body.i < 0){
        return res.status(400).json({'message': 'i: index parameter must be within bounds of current availability.'})
    }
    
    //Checks if from:date comes before to:date
    if(compareAsc.compareAsc(req.body.from, req.body.to) !== -1){
        return res.status(400).json({'message': `Start date, from: ${req.body.from} has to come after the end date, to: ${req.body.to}`})
    }
    
    if(req.body?.from) volunteer.availability[req.body.i].from = req.body.from;
    if(req.body?.to) volunteer.availability[req.body.i].to = req.body.to;
    const result = await volunteer.save();
    res.json(result);
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

