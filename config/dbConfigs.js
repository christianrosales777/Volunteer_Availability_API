const getSlots = require('slot-calculator');
const {Settings, DateTime} = require('luxon');
Settings.defaultZone = 'UTC';

//12bytes = 24character Hexadecimal for Mongo object id
const dbIDLength = 24;

// Start and End times of availability period - Currently set to right now -> 1 day in the future.
const dateTimeRef = DateTime.utc(DateTime.now().year, DateTime.now().month, DateTime.now().day, DateTime.now().hour, DateTime.now().minute);
const fromStart = dateTimeRef.toISO();
const toEnd = dateTimeRef.plus({month: 1} ).toISO();

// //Interval of availability slots
const mIntervals = 60;

module.exports = {dbIDLength, fromStart, toEnd, mIntervals};