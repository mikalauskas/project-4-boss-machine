const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting,
} = require('./db');

module.exports = meetingsRouter;

// get an array of all meetings
meetingsRouter.get('/', (req, res) => {
    const meetingsArray = getAllFromDatabase('meetings');
    res.send(meetingsArray);
});


// create a new minion and save it to the database
meetingsRouter.post('/', (req, res) => {
    res.status(201).send(createMeeting());
});

// delete a single minion by id
meetingsRouter.delete('/', (req, res) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');
    res.status(204).send(deletedMeetings);
});