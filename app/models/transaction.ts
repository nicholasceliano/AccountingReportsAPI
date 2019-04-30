export type Transaction = {
	id: string;
	accountType: string;
	value: number;
	quantity: number;
	postDate: Date;
	enterDate: Date;
	desc: string;
};
