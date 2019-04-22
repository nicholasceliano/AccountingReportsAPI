import fs = require('fs');
import express = require('express');
import path = require('path');
import { APICredentials } from '../models/apiCredentials';

export class MiddlewareHelper {
	
	getAPIKey(req: express.Request): APICredentials | undefined {
		let apiKey: string | undefined = undefined;
		let credentials: APICredentials | undefined = undefined;
		req = this.lowerCaseQueryParams(req);

		if (req.query.apikey) {
			apiKey = req.query.apikey;
		} else {
			apiKey = req.header('APIKey');
		}

		credentials = this.getCredentialsFromFile(apiKey);

		return credentials;	
	}

	private lowerCaseQueryParams(req) {
		for (let key in req.query)
			req.query[key.toLowerCase()] = req.query[key];

		return req;
	}

	private getCredentialsFromFile(apiKey) : APICredentials | undefined {
		let credentials = undefined;
		const data = JSON.parse(fs.readFileSync(path.join(global.appRoot, '..','credentials.json')).toString())
			
		for(let c in data.credentials) {
			if (data.credentials[c].APIKey === apiKey) {
				credentials = data.credentials[c];
				break;
			}
		}

		return credentials;
	}
}