import express = require('express');
import { config } from './config';
import { MiddlewareHelper } from './helpers/MiddlewareHelper';

module.exports = (app: express.Express) => {

	app.use((req, res, next) => {

		res.header('Access-Control-Allow-Origin', `${config().clientHostname}`);

		// check if CORS preflight
		if (req.header('Access-Control-Request-Method') && req.method === 'OPTIONS' && req.header('Origin')) {
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Methods', 'GET');
			res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, APIKey`);

			return res.sendStatus(200);
		}

		const apiCredentials = new MiddlewareHelper().getAPIKey(req);

		if (apiCredentials) {
			req.apiCredentails = apiCredentials;
		} else {
			return res.sendStatus(401)
		}
		
		next();
	});
};