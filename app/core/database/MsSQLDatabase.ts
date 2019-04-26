import { AbstractDatabase } from './AbstractDatabase';

export class MsSQLDatabase extends AbstractDatabase {

	public query(queryString: string): Promise<object> {
		return new Promise((resolve, reject) => {
			resolve([])
		});
	}

	public storedProc(storedProc: string): Promise<object> {
		return this.query(`CALL ${storedProc}`);
	}

	protected createConnection() {
		const db = this.dbCredentials.database;
	}
}
