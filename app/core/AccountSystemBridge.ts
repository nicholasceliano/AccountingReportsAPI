import { Account } from '../models/account';

export interface AccountSystemBridge {
	accounts(): Promise<Account[]>;
}
