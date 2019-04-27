import { AccountSystemBridge } from '../core/AccountSystemBridge';
import { MySQLDatabase } from '../core/database/MySQLDatabase';
import { Account } from '../models/account';
import { AccountingSystemDatabase } from '../core/AccountingSystemDatabase';
import { Stock } from '../models/stock';

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
					accountId: e.account_guid,
					accountName: e.account_name,
					accountType: e.account_type,
					currencyId: e.currency_guid,
					currencyName: e.currency_name,
					date: e.value_date,
					value: (e.account_currency * e.currency_value),
				} as Account);
			});

			return array;
		});
	}

	public stocks(): Promise<Stock[]> {
		return this.promiseHandler<Stock[]>(this.db.storedProc(`getStockValuesOvertime(null, null)`), (res) => {
			const array: Stock[] = [];

			res[0].forEach((e) => {
				array.push({
					ct: e.quantity,
					ctChg: e.quantityChange,
					ctChgDt: e.quantityChangeDate,
					id: e.account_guid,
					name: e.name,
					price: e.price,
					priceDt: e.priceDate,
				} as Stock);
			});

			return array;
		});
	}
}
