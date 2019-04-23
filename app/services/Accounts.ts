import { AccountingSystem } from '../core/AccountingSystem';
import { APICredentials } from '../models/apiCredentials';

export class Accounts extends AccountingSystem {
	constructor(apiCreds: APICredentials) {
		super(apiCreds);
	}

	public list() {
		return this.getAccounts();
	}
}
