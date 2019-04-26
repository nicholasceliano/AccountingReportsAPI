import { DatabaseConnInfo } from '../../models/DatabaseConnInfo';

export abstract class AbstractDatabase {
	protected dbCredentials: DatabaseConnInfo;

	constructor(_dbCredentials: DatabaseConnInfo) {
		this.dbCredentials = _dbCredentials;
	}

	protected abstract createConnection();
	public abstract query(queryString: string);
	public abstract storedProc(storedProc: string);
}
