const dbIDLength = require('../config/dbIDLength');
const Volunteer = require('../model/Volunteer');

const getVolunteerAvailability = async (req, res) =>{
    if(!req?.params?.id || req.params.id.length !== dbIDLength) return res.status(400).json({'message': 'Volunteer ID required'})
        const volunteer = await Volunteer.findOne({_id: req.params.id}).exec();
    if(!volunteer){
        return res.status(204).json({'message': `No volunteer matches the ID${req.body.id}`})
    }
    res.json(volunteer);
}

module.exports = {
    getVolunteerAvailability
}

