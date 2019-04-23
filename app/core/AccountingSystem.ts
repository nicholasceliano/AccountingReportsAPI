import { AccountSystemBridge } from './AccountSystemBridge';
import { GnuCashImp } from '../implementations/GnuCashImp';
import { VMSImp } from '../implementations/VMSImp';
import { APICredentials } from '../models/apiCredentials';

export abstract class AccountingSystem {

	protected bridge: AccountSystemBridge;

	constructor(apiCreds: APICredentials) {
		switch (apiCreds.AccountType) {
			case 'gnucash':
				this.bridge = new GnuCashImp(apiCreds.DatabaseConnInfo);
				break;
			case 'vms':
				this.bridge = new VMSImp();
				break;
			default:
				throw(new Error('Invalid Account Type'));
		}
	}

	protected getAccounts() {
		return this.bridge.accounts();
	}
}
