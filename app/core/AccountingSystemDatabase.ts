export abstract class AccountingSystemDatabase {

	protected promiseHandler<T>(promise: Promise<object>, successFunction: (res) => T): Promise<T> {
		return new Promise((resolve, reject) => {
			promise.then((res) => resolve(successFunction(res))).catch((err) => reject(`${err}`));
		});
	}
}
