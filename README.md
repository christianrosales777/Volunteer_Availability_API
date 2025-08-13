# Volunteer_Availability_API
This application utilizes mongoDB to creates endpoints to:
    get all availability of all campuses.                      (/campuses)
    get a volunteer's availability time frame                  (/volunteers/:id)
    Update/add to an existing volunteer's available time slots (/volunteers)

## Tech Stack
Nodejs (22.18.0)Runtime environment
npm (10.9.3) Node Package Manager
    date-fns (4.1.0) Used tocompared if a date comes early/after & for logging format
    dotenv (17.2.1) Stores .env package to be used with process
    express: (5.1.0) Unopinionated minimalist web framework
    luxon: (3.7.1) Allows setting of date time configuration and modifying time
    mongoose: (8.17.1) Object Data Model for MongoDB
    slot-calculator: (2.2.1) Calculated time slots of open/close allowing a large format style
    uuid: (11.1.0) Unique identifier for req/err logs
MongoDB Document database that shas scalability and flexibility
Docker (28.3.2) Platform that help shares containers/images for others to run applications
Docker Compase (2.38.2) Tool that defines and runs multiple containers linking them



### Instructions for Setup:
1. Have Node.js (v22.18.0) installed
2. Have npm (10.9.3) installed
3. Have Docker (28.3.2) installed
4. Have Docker Compose (v2.38.2) installed
5. Clone the repository
    a. `git clone https://github.com/christianrosales777/Volunteer_Availability_API`
6. Build up docker image and run
    a. `cd Volunteer_Availability_API`
    b. `docker-compose up --build`
7. Make a request to one of the endpoints
    a. If it includes updating/adding/getting a volunteer data, make sure to include the _id (example: 689b40aa5ee1db7fd7f07b10)
    b. if it's to get all campuses the endpoint /campuses shall suffice

#### Description
The application is currently set up to look at the current date through one month time in the future. This can be adjusted
by chaning fromStart or toEnd time peirods. The block intervals of when a time frame is available can be adjusted
through mInterval (in minutes). With that being how the code is designed, the campus's availability and volunteer's
availability will eventually pass their available dates and will need updated times of their next availability. This is due
to all availability being empty, or unavailable, at all times unless specified. 

#### Challenges Faced
One troubling occurance I kept running into while developing this, is that the luxon package and slots-calculator packages
I was using was having trouble getting the exact "now" time. Luxon showed the correct now time converted into UTC but after I passed it into a slot-calculator function, it would list all times as unavailable even if specified it was avilable. To get around this, I created a "now" time that sets seconds and miliseconds to 0. To address this even better I could dive into the package slot-calculator and luxon to find the exact spot where this error is coming from to address it even better so that I can have the exact time currently.