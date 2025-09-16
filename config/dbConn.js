const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://host.docker.internal:27017/Elevation');
    }catch(e){
        console.error(e);
    }
}


module.exports = connectDB;