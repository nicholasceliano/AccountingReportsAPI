import { DatabaseConnInfo } from '../../models/DatabaseConnInfo';

export abstract class AbstractDatabase {
	protected dbCredentials: DatabaseConnInfo;

	constructor(_dbCredentials: DatabaseConnInfo) {
		this.dbCredentials = _dbCredentials;
	}

	public abstract query(queryString: string);
	public abstract storedProc(storedProc: string);
	protected abstract createConnection();
}
