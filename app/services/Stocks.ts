import { AccountingSystem } from '../core/AccountingSystem';
import { APICredentials } from '../models/apiCredentials';
import { AlhpaVantage } from './AlphaVantage';

export class Stocks extends AccountingSystem {
	constructor(apiCreds: APICredentials) {
		super(apiCreds);
	}

	public list(type: string, id: string, historyType: string, historyMonths?: number) {
		if (type === 'quote') {
			return new AlhpaVantage().getQuote(id, historyType);
		} else if (type === 'account') {
			return this.getStocks(id, historyMonths);
		} else {
			throw new Error('Error: invalid type parameter');
		}
	}
}
