# Volunteer_Availability_API
This application utilizes mongoDB to creates endpoints to:  
* get all availability of all campuses.                      (/campuses)  
   * Will return all start times: from, end time: to, and campuses names: campusName, and if they are available at those times: available.
* get a volunteer's availability time frame                  (/volunteers/:id)  
   * Will return all available time frames in the structure of from: ...  to: ... avilable: true
* Update/add to an existing volunteer's available time slots (/volunteers)  
   * Will check if the index i: provided is already inside of the volunteer's availability and if not it'll append the availability.
## Tech Stack
* Nodejs: (22.18.0)Runtime environment  
* npm (10.9.3): Node Package Manager  
   * date-fns: (4.1.0) Used tocompared if a date comes early/after & for logging format  
   * dotenv: (17.2.1) Stores .env package to be used with process
   * express: (5.1.0) Unopinionated minimalist web framework
   * luxon: (3.7.1) Allows setting of date time configuration and modifying time
   * mongoose: (8.17.1) Object Data Model for MongoDB
   * slot-calculator: (2.2.1) Calculated time slots of open/close allowing a large format style
   * uuid: (11.1.0) Unique identifier for req/err logs
   * swagger-ui-express: (5.0.1) Serving Auto generated swagger-ui generated API Documentation
   * yaml: (2.8.1)  Definitive library for YAML that supports parsing of YAML documents
   * cors: (2.8.5) Provides middleware to enable CORS
* MongoDB Document database that has scalability and flexibility  
* Docker (28.3.2) Platform that help shares containers/images for others to run applications  
* Docker Compose (2.38.2) Tool that defines and runs multiple containers linking them  


### Instructions for Setup:
1. Have Node.js (v22.18.0) installed
2. Have npm (10.9.3) installed
3. Have Docker (28.3.2) installed
4. Have Docker Compose (v2.38.2) installed
5. Clone the repository
    1. `git clone https://github.com/christianrosales777/Volunteer_Availability_API`
6. Build up docker image and run
    1. Make sure docker is open and running before running the code 
    2. `cd Volunteer_Availability_API`
    3. `docker-compose up --build`
7. Make a request to one of the endpoints. Here are some examples. **This will require Thunder Client/Postman equivalent to send a json body OR use the Swagger api found at `http://localhost:4567/api-docs/`**
    1. Obtain Volunteer Avilability: `http://localhost:4567/volunteers/689b40aa5ee1db7fd7f07b10` or `http://localhost:4567/volunteers/689d385c005a314c4e80ef571`
    2. Update/add Volunteer Availability: `http://localhost:4567/volunteers`
    body: `{  "id": "689d385c005a314c4e80ef57","from": "2025-09-01T02:50:00.000Z","to": "2025-09-01T03:50:00.000Z","i": 5}`  To add have an index value higher than current availability or a negitive value
    3. Obtained all campuses availability: `http://localhost:4567/campuses`  

#### Adjustments
The application is currently set up to look at the current date through one month time in the future. This can be adjusted
by chaning fromStart or toEnd time peirods. With that being how the code is designed, the campus's availability and volunteer's availability will eventually pass their available dates and will need updated times of their next availability. This is due to all availability being empty, or unavailable, at all times unless specified.  The block intervals of when a time frame is available can be adjusted through mInterval (in minutes) which will allow large time slots or shorter time slots to be sorted through. The current identifier in dbIDLength is the 12-byte/24 character hexadecimal string that MongoDB provides for objectId and it was used as such but could be changed to allow a different identifer to be tracked.

##### Challenges Faced
One troubling occurance I kept running into while developing this, is that the luxon package and slots-calculator packages
I was using was having trouble getting the exact "now" time. Luxon showed the correct now time converted into UTC but after I passed it into a slot-calculator function, it would list all times as unavailable even if specified it was avilable. To get around this, I created a "now" time that sets seconds and miliseconds to 0. To address this even better I could dive into the package slot-calculator and luxon to find the exact spot where this error is coming from to address it even better so that I can have the exact time currently.