const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

minionsRouter.get('/', (req, res) => {
    console.log('123');
    res.send('123');
});