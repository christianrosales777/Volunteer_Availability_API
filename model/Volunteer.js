const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const volunteerSchema = new Schema({
    firstName: String,
    lastName: String,
    campus: String,
    availability: [String]
})

module.exports = mongoose.model('Volunteer', volunteerSchema);