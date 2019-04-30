export class TransactionValidator implements APIValidator {
	public errorMessage: string = 'Invalid query parameters: accountId';

	constructor(private accountId: string) {}

	public validate(): boolean {
		return (this.accountId ? true : false);
	}
}
