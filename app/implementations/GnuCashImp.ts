import { AccountSystemBridge } from '../core/AccountSystemBridge';
import { MySQLDatabase } from '../core/database/MySQLDatabase';
import { Account } from '../models/account';
import { AccountingSystemDatabase } from '../core/AccountingSystemDatabase';
import { Stock } from '../models/stock';
import { Transaction } from '../models/transaction';

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
					currencyType: e.currency_type,
					date: e.value_date,
					desc: e.description,
					isPlaceholder: (e.placeholder === 1 ? true : false),
					isStock: (e.account_type === 'STOCK' ? true : false),
					lastPrice: 0,
					parentId: e.account_parent_guid,
					parentName: e.account_parent_name,
					parentRoot: (e.root_account === 1 ? true : false),
					transCt: 0,
					transCtMo: 0,
					transCtWk: 0,
					transCtYr: 0,
					valChangeMo: 0,
					valChangeWk: 0,
					valChangeYr: 0,
					value: (e.account_quantity * e.currency_value),
				} as Account);
			});

			return array;
		});
	}

	public account(accountId: string): Promise<Account> {
		return this.promiseHandler<Account>(this.db.storedProc(`getAccount('${accountId}')`), (res) => {
			const dataRow = res[0][0];

			return {
				accountId: dataRow.account_id,
				accountName: dataRow.name,
				accountType: dataRow.account_type,
				currencyId: dataRow.currency_guid,
				currencyName: dataRow.currency_name,
				currencyType: dataRow.currency_type,
				desc: dataRow.description,
				isPlaceholder: (dataRow.placeholder === 1 ? true : false),
				isStock: (dataRow.account_type === 'STOCK' ? true : false),
				lastPrice: dataRow.last_price,
				lastPriceDt: dataRow.last_price_date,
				parentId: dataRow.account_parent_guid,
				parentName: dataRow.account_parent_name,
				parentRoot: (dataRow.root_account === 1 ? true : false),
				transCt: dataRow.transaction_count,
				transCtMo: dataRow.transactions_monthly,
				transCtWk: dataRow.transactions_weekly,
				transCtYr: dataRow.transactions_yearly,
				valChangeMo: dataRow.val_change_monthly,
				valChangeWk: dataRow.val_change_weekly,
				valChangeYr: dataRow.val_change_yearly,
				value: dataRow.current_value,
			} as Account;
		});
	}

	public stocks(id: string, historyMonths: number): Promise<Stock[]> {
		const idParam = id ? '\'' + id + '\'' : null;
		const historyMonthsParam = isNaN(historyMonths) ? null : historyMonths;

		return this.promiseHandler<Stock[]>(this.db.storedProc(`getStockValuesOvertime(${idParam},${historyMonthsParam})`), (res) => {
			const array: Stock[] = [];

			res[0].forEach((e) => {
				array.push({
					ct: e.totalQuantity,
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

	public transactions(accountId: string): Promise<Transaction[]> {
		return this.promiseHandler<Transaction[]>(this.db.storedProc(`getTransactionsByAccountId('${accountId}')`), (res) => {
			const array: Transaction[] = [];
			res[0].forEach((e) => {
				array.push({
					accountType: e.account_type,
					desc: e.description,
					enterDate: e.enter_date,
					id: e.transaction_id,
					postDate: e.post_date,
					quantity: e.transaction_quantity,
					value: e.transaction_value,
				} as Transaction);
			});

			return array;
		});
	}
}
