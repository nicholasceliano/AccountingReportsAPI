import express = require('express');
import path = require('path');
import { config } from './config';

const app = express();
global.appRoot = path.resolve(__dirname);

require('./appMiddleware')(app);

app.use(`/${config().apiVersion}/account`, require('./routes/api/account'));

module.exports = app.listen(config().port, () => console.log(`App listening on port ${config().port}`));