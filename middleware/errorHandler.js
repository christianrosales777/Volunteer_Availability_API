const {logEvents} = require('./logEvents');

const errorHandler = (e, req, res, next) => {
    logEvents(`${e.name}: ${e.message}`, 'errorLog.txt');
    console.error(e.stack);
    res.status(500).send(e.message);
}

module.exports = errorHandler;