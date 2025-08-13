//12bytes = 24character Hexadecimal for Mongo object id
const dbIDLength = 24;

//Start and End times of availability period
const fromStart = "2025-08-12T15:14:00.000Z";
const toEnd = "2025-08-12T23:14:00.000Z";
const mIntervals = 60;

module.exports = {dbIDLength, fromStart, toEnd, mIntervals};