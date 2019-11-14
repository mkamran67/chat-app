const notifier = require('node-notifier');
const cron = require('node-cron');
const fs = require('fs');


// Directory check &|| Creation
if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}

// Path to directories that will contain/create .JSON files for storage
let filePath = "./data/test.json";


// write date to disk
function getDateAndTime() {
    // generating a Date o
    let date = new Date();

    // using that adate object to concatenate date with HRS:MINS -- DAY/MONTH/YEAR
    let timeAndDate = {
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };

    // returning the the date as string
    return timeAndDate;
}

function writeObjectToFile(noteObj, path) {

    let arrayObject = [];
    let stringifiedData;


    // Check and if previous file exists read from it
    if (checkIfFileExists(path)) {

        console.log(`\nAdding to an existing list...`);

        // 1. Since the file exists need to grab previous data
        let previousData = readFromFile(path);

        // 2. Previous data will come parsed will need to be added to an array
        arrayObject = [...previousData];

        // 3. Add the incoming object to the array
        arrayObject.push(noteObj);

    } else {
        // Since no file exists we don't have to worry about previous data merging
        // 1. Add incoming obj to an array
        arrayObject.push(noteObj);

    }

    // Finale-> Stringify the array of objects
    stringifiedData = JSON.stringify(arrayObject);

    // lastly-> Write the array of objects into file
    fs.writeFileSync(path, stringifiedData);

    console.log(` ------- Added :]`);

}

function readFromFile(path) {
    // read from file
    let rawData = fs.readFileSync(path);
    // parse raw buffer data into JSON obj
    let readData = JSON.parse(rawData);

    return readData;
}

function checkIfFileExists(path) {
    // Check if file exists
    if (fs.existsSync(path)) {
        // returns true if yes
        // console.log(`file exists...`);
        return true;
    } else {
        // return fales if no
        // console.log(`file does not exist...`);
        return false;
    }
}

function testWite(path) {
    let tempObj = getDateAndTime();

    writeObjectToFile(tempObj, path);
}

function cronDestroier() {
    let date = new Date();

    console.log(date.getMinutes());

    if (date.getMinutes() > 52) {
        timeJob.stop();
        timeJob.destroy();

    }
}

timeJob = cron.schedule('*/15 * * * * *', () => {

    testWite(filePath);
    cronDestroier();

}, {

    scheduled: false

});

timeJob.start();