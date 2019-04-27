import { Account } from '../models/account';
import { Stock } from '../models/stock';

export interface AccountSystemBridge {
	accounts(): Promise<Account[]>;
	stocks(): Promise<Stock[]>;
}
