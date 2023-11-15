const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting,
    addToDatabase,
} = require('./db');

module.exports = meetingsRouter;

// get an array of all meetings
meetingsRouter.get('/', (req, res) => {
    const meetingsArray = getAllFromDatabase('meetings');
    res.send(meetingsArray);
});


// create a new minion and save it to the database
meetingsRouter.post('/', (req, res) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

// delete a single minion by id
meetingsRouter.delete('/', (req, res) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');
    res.status(204).send(deletedMeetings);
});