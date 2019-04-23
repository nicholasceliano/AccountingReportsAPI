import fs = require('fs');
import express = require('express');
import path = require('path');
import { APICredentials } from '../models/apiCredentials';
import { Logger } from 'winston';

export class MiddlewareHelper {
	private logger: Logger;

	constructor(_logger: Logger) {
		this.logger = _logger;
	}

	public getAPIKey(req: express.Request): APICredentials | undefined {
		let apiKey: string | undefined;
		let credentials: APICredentials | undefined;
		req = this.lowerCaseQueryParams(req);

		if (req.query.apikey) {
			apiKey = req.query.apikey;
		} else {
			apiKey = req.header('APIKey');
		}

		credentials = this.getCredentialsFromFile(apiKey);

		return credentials;
	}

	private lowerCaseQueryParams(req: express.Request) {
		for (const key in req.query) {
			if (req.query.hasOwnProperty(key)) {
				req.query[key.toLowerCase()] = req.query[key];
			}
		}

		return req;
	}

	private getCredentialsFromFile(apiKey): APICredentials | undefined {
		let credentials: APICredentials | undefined;
		const data = JSON.parse(fs.readFileSync(path.join(global.appRoot, '..', 'credentials.json')).toString());

		for (const c in data.credentials) {
			if (data.credentials[c].APIKey === apiKey) {
				credentials = data.credentials[c];
				break;
			}
		}

		return credentials;
	}
}
