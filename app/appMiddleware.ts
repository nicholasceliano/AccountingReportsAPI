import express = require('express');
import { config } from './config';
import { Logger } from 'winston';
import { ExpressRequest } from './extensions/ExpressRequest';
import { ExpressResponse } from './extensions/ExpressResponse';

module.exports = (app: express.Express, logger: Logger) => {

	app.use((req, res, next) => {

		res.header('Access-Control-Allow-Origin', `${config().clientHostname}`);

		// check if CORS preflight
		if (req.header('Access-Control-Request-Method') && req.method === 'OPTIONS' && req.header('Origin')) {
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Methods', 'GET');
			res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, APIKey`);

			return res.sendStatus(200);
		}

		new ExpressResponse().setResponseObjects(res);

		const apiCredentials = new ExpressRequest(logger).getAPIKey(req);

		if (apiCredentials) {
			req.apiCredentails = apiCredentials;
		} else {
			return res.APIError(401, 'APIKey Invalid or missing');
		}

		next();
	});

};
