import { AccountSystemBridge } from '../core/AccountSystemBridge';
import { DatabaseConnInfo } from '../models/DatabaseConnInfo';

export class GnuCashImp implements AccountSystemBridge {

	constructor(dbConnInfo: DatabaseConnInfo) {
		const test = '';
	}

	public accounts() {
		return [];
	}

	private database() {

		return '';
	}
}
