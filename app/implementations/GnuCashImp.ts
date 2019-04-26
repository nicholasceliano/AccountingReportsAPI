import { AccountSystemBridge } from '../core/AccountSystemBridge';
import { MySQLDatabase } from '../core/database/MySQLDatabase';
import { Account } from '../models/account';
import { AccountingSystemDatabase } from '../core/AccountingSystemDatabase';

export class GnuCashImp extends AccountingSystemDatabase implements AccountSystemBridge {
	private db: MySQLDatabase;

	constructor(db: MySQLDatabase) {
		super();
		this.db = db;
	}

	public accounts(): Promise<Account[]> {
		return this.promiseHandler<Account[]>(this.db.storedProc('getAccounts'), (res) => {
			const array: Account[] = [];

			res[0].forEach((e) => {
				array.push({
					accountType: e.account_type,
					accountId: e.account_guid,
					accountName: e.account_name,
					date: e.value_date,
					currencyId: e.currency_guid,
					currencyName: e.currency_name,
					value: (e.account_currency * e.currency_value),
				} as Account);
			});

			return array;
		});
	}
}
