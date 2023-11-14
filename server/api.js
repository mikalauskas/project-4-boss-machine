const express = require('express');
const apiRouter = express.Router();

module.exports = apiRouter;

const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);

const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);

const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);