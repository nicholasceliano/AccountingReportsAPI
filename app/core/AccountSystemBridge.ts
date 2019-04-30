import { Account } from '../models/account';
import { Stock } from '../models/stock';
import { Transaction } from '../models/transaction';

export interface AccountSystemBridge {
	accounts(): Promise<Account[]>;
	stocks(id: string, historyMonths?: number): Promise<Stock[]>;
	transactions(accountId: string): Promise<Transaction[]>;
}
