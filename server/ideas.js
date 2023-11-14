const express = require('express');
const ideasRouter = express.Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

module.exports = ideasRouter;

// get an array of all ideas
ideasRouter.get('/', (req, res) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.send(ideasArray);
});

ideasRouter.param('ideaId', (req, res, next, id) => {
    req.ideaId = id;
    next();
});

// get a single idea by id
ideasRouter.get('/:ideaId', (req, res) => {
    const idea = getFromDatabaseById('ideas', req.ideaId);
    res.send(idea);
});

// update a single idea by id
ideasRouter.put('/:ideaId', (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// create a new idea and save it to the database
ideasRouter.post('/', (req, res) => {
    const addedIdea = addToDatabase('ideas', req.body);
    res.status(201).send(addedIdea);
});

// delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.ideaId);
    if (deletedIdea) {
        res.status(204).send(deletedIdea);
    } else {
        res.status(404);
    }
});