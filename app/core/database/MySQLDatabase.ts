import { AbstractDatabase } from './AbstractDatabase';
import mysql, { MysqlError } from 'mysql';

export class MySQLDatabase extends AbstractDatabase {
	public query(queryString: string): Promise<object> {
		return new Promise((resolve, reject) => {
			const conn = this.createConnection();
			conn.connect();

			conn.query(queryString, (error: MysqlError | null, results, fields) => {
				if (error) reject(`Database Error: ${error.errno}`);

				resolve(results);
			});

			conn.end();
		});
	}

	public storedProc(storedProc: string): Promise<object> {
		return this.query(`CALL ${storedProc}`);
	}

	protected createConnection() {
		return mysql.createConnection({
			database: this.dbCredentials.database,
			host: this.dbCredentials.server,
			password: this.dbCredentials.password,
			user: this.dbCredentials.username,
		});
	}
}
