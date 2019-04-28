import { isArray } from 'util';

declare global {
	namespace Express {
		interface Response {
			sendAPIResponse(promise: Promise<object>, validator?: APIValidator);
			APIError(code: number, message: string);
		}
	}
}

export class ExpressResponse {
	public setResponseObjects(res) {
		res.APIError = (code: number, message: string) => {
			res.status(code).send({ error: message });
		};

		res.sendAPIResponse = (promise: Promise<object>, validator?: APIValidator) => {
			if (validator === undefined ? true : validator.validate()) {
				promise.then((obj) => {
					res.send({
						data: obj,
						results: isArray(obj) ? obj.length : 1,
					});
				}).catch((err) => {
					res.APIError(500, err);
				});
			} else {
				res.APIError(400, validator === undefined ? 'Bad Request' : validator.errorMessage);
			}
		};
	}
}
