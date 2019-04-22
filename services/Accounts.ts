import { AccountingSystem } from "../core/AccountingSystem";
import { APICredentials } from "../models/apiCredentials";

export class Accounts extends AccountingSystem {
	constructor(apiCredentials: APICredentials) {
		super(apiCredentials)
	}

	list() {
		return this.getAccounts();
	}
}
