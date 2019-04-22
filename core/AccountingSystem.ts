import { AccountSystemBridge } from './AccountSystemBridge'
import { GnuCashImp } from '../implementations/GnuCashImp';
import { VMSImp } from '../implementations/VMSImp';
import { APICredentials } from '../models/apiCredentials';

export abstract class AccountingSystem {

	protected bridge: AccountSystemBridge;

	constructor(apiCredentails: APICredentials) {
		switch (apiCredentails.AccountType) {
			case 'gnucash':
				this.bridge = new GnuCashImp()
				break;
			case 'vms':
				this.bridge = new VMSImp()
				break;
			default:
				throw('Invalid Account Type');
		}
    }

	protected getAccounts() {
		return this.bridge.accounts();
	}
}
