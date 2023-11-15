const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// get an array of all ideas
ideasRouter.get('/', (req, res) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.send(ideasArray);
});

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.ideaId = id;
        next();
    } else {
        res.status(404).send();
    }
});

// get a single idea by id
ideasRouter.get('/:ideaId', (req, res) => {
    res.send(getFromDatabaseById('ideas', req.ideaId));
});

// update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    console.log(updatedIdea);
    if (updatedIdea === null) {
        res.status(404).send();
    } else {
        res.send(updatedIdea);
    }
});

// create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const addedIdea = addToDatabase('ideas', req.body);
    res.status(201).send(addedIdea);
});

// delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.ideaId);
    if (deletedIdea) {
        res.status(204).send(deletedIdea);
    } else {
        res.status(404).send();
    }
});