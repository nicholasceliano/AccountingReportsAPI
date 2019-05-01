import { AccountSystemBridge } from './AccountSystemBridge';
import { GnuCashImp } from '../implementations/GnuCashImp';
import { VMSImp } from '../implementations/VMSImp';
import { APICredentials } from '../models/apiCredentials';
import { MySQLDatabase } from './database/MySQLDatabase';
import { MsSQLDatabase } from './database/MsSQLDatabase';

export abstract class AccountingSystem {

	private bridge: AccountSystemBridge;

	constructor(apiCreds: APICredentials) {
		switch (apiCreds.AccountType) {
			case 'gnucash':
				this.bridge = new GnuCashImp(new MySQLDatabase(apiCreds.DatabaseConnInfo));
				break;
			case 'vms':
				throw(new Error('not implemented')); // this.bridge = new VMSImp(new MsSQLDatabase(apiCreds.DatabaseConnInfo));
				break;
			default:
				throw(new Error('Invalid Account Type'));
		}
	}

	protected getAccounts(id?: string) {
		if (id) {
			return this.bridge.account(id);
		} else {
			return this.bridge.accounts();
		}
	}

	protected getStocks(id: string, historyMonths?: number) {
		return this.bridge.stocks(id, historyMonths);
	}

	protected getTransactions(accountId: string) {
		return this.bridge.transactions(accountId);
	}
}
