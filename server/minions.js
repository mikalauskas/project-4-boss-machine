const express = require('express');
const minionsRouter = express.Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

module.exports = minionsRouter;

// get an array of all minions
minionsRouter.get('/', (req, res) => {
    const minionsArray = getAllFromDatabase('minions');
    res.send(minionsArray);
});

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minionId = id;
        next();
    } else {
        res.status(404).send();
    }
});

// get a single minion by id
minionsRouter.get('/:minionId', (req, res) => {
    res.send(getFromDatabaseById('minions', req.minionId));
});

// update a single minion by id
minionsRouter.put('/:minionId', (req, res) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion === null) {
        res.status(404).send();
    } else {
        res.send(updatedMinion);
    }
});

// create a new minion and save it to the database
minionsRouter.post('/', (req, res) => {
    const addedMinion = addToDatabase('minions', req.body);
    res.status(201).send(addedMinion);
});

// delete a single minion by id
minionsRouter.delete('/:minionId', (req, res) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.minionId);
    if (deletedMinion) {
        res.status(204).send(deletedMinion);
    } else {
        res.status(404).send();
    }
});