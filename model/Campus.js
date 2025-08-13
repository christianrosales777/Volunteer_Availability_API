const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const campusSchema = new Schema({
    campusName: {
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
    }],
    address: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Campus', campusSchema);