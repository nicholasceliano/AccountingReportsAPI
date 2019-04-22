import { APICredentials } from "../models/apiCredentials";

export {}; // force file to be loaded as module

declare global {
	namespace Express {
		interface Request {
			apiCredentails: APICredentials;
		}
	}
}