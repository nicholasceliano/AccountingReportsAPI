import { AccountSystemBridge } from '../core/AccountSystemBridge';
import { MsSQLDatabase } from '../core/database/MsSQLDatabase';
import { AccountingSystemDatabase } from '../core/AccountingSystemDatabase';

export class VMSImp extends AccountingSystemDatabase { // implements AccountSystemBridge {

	constructor(dbConnInfo: MsSQLDatabase) {
		super();
	}

	public accounts() {
		return [];
	}
}
