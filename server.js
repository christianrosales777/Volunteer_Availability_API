require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const fs = require('fs')
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 4567;

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors');

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/volunteers', require('./routes/api/volunteer'));
app.use('/campuses', require('./routes/api/campus'))

app.use(errorHandler);

mongoose.connection.once('open', () =>{
    app.listen(PORT, () => console.log(`The server is now running on port: ${PORT}`));
})