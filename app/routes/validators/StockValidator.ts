export class StockValidator implements APIValidator {

	constructor(private type: string, private id: string, private historyType: string, private historyMonths: any) {}

	public validate(): boolean {
		return this.validType() && this.validHistoryType() && this.validHistoryMonths() && this.validId();
	}

	private validType(): boolean {
		return (this.type === 'account' || this.type === 'quote');
	}

	private validHistoryType(): boolean {
		return (this.type === 'quote') ? this. historyType === 'monthly' ||
				this.historyType === 'weekly' || this.historyType === 'daily' : true;
	}

	private validHistoryMonths(): boolean {
		return (this.type === 'account') ? !isNaN(this.historyMonths) || this.historyMonths === undefined : true;
	}

	private validId(): boolean {
		if (this.type === 'account') {
			return true;
		} else if (this.type === 'quote') {
			return this.id !== undefined;
		} else {
			return false;
		}
	}
}
