import express = require('express');
import path = require('path');
import { config } from './config';
import { loggers } from 'winston';

global.appRoot = path.resolve(__dirname);
require('./logger');

const app = express();
const logger = loggers.get('logger');
require('./appMiddleware')(app, logger);

app.use(`/${config().apiVersion}/account`, require('./routes/api/account'));
app.use(`/${config().apiVersion}/stock`, require('./routes/api/stock'));

module.exports = app.listen(config().port);
