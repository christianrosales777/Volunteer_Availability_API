const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const volunteerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    availability: [{
        from: {
            type: String
        },
        to: {
            type: String
        }
    }] 
})

module.exports = mongoose.model('Volunteer', volunteerSchema);