const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

meetingsRouter.get('/', (req, res) => {
    console.log('123');
    res.send('123');
});