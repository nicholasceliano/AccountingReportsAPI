import { isArray } from 'util';

declare global {
	namespace Express {
		interface Response {
			sendAPIResponse(promise: Promise<object>);
			APIError(code: number, message: string);
		}
	}
}

export class ExpressResponse {
	public setResponseObjects(res) {
		res.APIError = (code: number, message: string) => {
			res.status(code).send({ error: message });
		};

		res.sendAPIResponse = (promise: Promise<object>) => {
			promise.then((obj) => {
				res.send({
					data: obj,
					results: isArray(obj) ? obj.length : 1,
				});
			}).catch((err) => {
				res.APIError(500, err);
			});
		};
	}
}
