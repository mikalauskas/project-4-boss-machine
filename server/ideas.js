const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

ideasRouter.get('/', (req, res) => {
    console.log('123');
    res.send('123');
});