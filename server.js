require('dotenv').config();
const express = require('express');
const app = express();

const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 4567;

connectDB();

app.use(logger);

app.use(express.json());

app.use('/volunteers', require('./routes/api/volunteer'));

app.use(errorHandler);

mongoose.connection.once('open', () =>{
    app.listen(PORT, () => console.log(`The server is now running on port: ${PORT}`));
})