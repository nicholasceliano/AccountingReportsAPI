import { AccountingSystem } from '../core/AccountingSystem';
import { APICredentials } from '../models/apiCredentials';

export class Transactions extends AccountingSystem {
	constructor(apiCreds: APICredentials) {
		super(apiCreds);
	}

	public list(accountId: string) {
		return this.getTransactions(accountId);
	}
}
