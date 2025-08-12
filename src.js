import { getSlots } from "slot-calculator"
import { DateTime, Settings } from "luxon";

Settings.defaultZone = "UTC";

// Obtain the current time passing in all but s & ms
const dateTimeRef = DateTime.utc(DateTime.now().year, DateTime.now().month, DateTime.now().day, DateTime.now().hour, DateTime.now().minute); 


const {allSlots} = getSlots({
  from: dateTimeRef.toISO(),
  to: dateTimeRef.plus({ hour: 4 }).toISO(),
    // availability: [
    // {
    //   from: dateTimeRef.toISO(),
    //   to: dateTimeRef.plus({ minute: 60 }).toISO(),
    // },
    // {
    //   from: dateTimeRef.plus({minute: 120}).toISO(),
    //   to: dateTimeRef.plus({ minute: 180 }).toISO(),
    // }],
    unavailability:[
    {
        from: dateTimeRef.plus({hour: 1}).toISO(),
        to: dateTimeRef.plus({hour: 2}).toISO()
    }
  ],
  duration: 60,
});



console.log(allSlots)
