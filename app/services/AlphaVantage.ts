import { get } from 'https';
import { Stock } from '../models/stock';
import { config } from '../config';

export class AlhpaVantage {
	public getQuote(symbol: string, historyType: string): Promise<Stock[]> {
		const url = `${config().alphaVantageUri}?function=TIME_SERIES_${historyType.toUpperCase()}` +
			`${historyType === 'daily' ? '&outputsize=full' : ''}&symbol=${symbol}&apikey=${config().alphaVantageUri}`;
		return new Promise((resolve, reject) => {
			get(url, (res) => {
				let rawData = '';

				res.on('data', (d) => {
					rawData += d;
				});

				res.on('end', () => {
					const jsonData = JSON.parse(rawData);
					const stockData: Stock[] = [];
					/* tslint:disable:no-string-literal */
					const errNote = jsonData['Note'];
					const metaData = jsonData['Meta Data'];
					const dailyData = jsonData[`Time Series (${historyType.upperFirstLetter()})`] ||
						jsonData[`${historyType.upperFirstLetter()} Time Series`];
					/* tslint:enable:no-string-literal */

					if (errNote) {
						reject(errNote);
					}

					for (const p in dailyData) {
						if (dailyData[p]) {
							stockData.push({
								ct: 0,
								id: metaData['2. Symbol'],
								name: metaData['2. Symbol'],
								price: dailyData[p]['4. close'],
								priceDt: new Date(p),
							} as Stock);
						}
					}

					resolve(stockData);
				});
			}).on('error', (e) => {
				reject(e);
			});
		});
	}
}
