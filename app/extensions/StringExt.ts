declare global {
	interface String {
		upperFirstLetter();
	}

	interface StringConstructor {
		convertToNumber(val: any);
		convertToLowerCase(val: any);
	}
}

String.convertToNumber = (val: any) => {
	return val === undefined ? val : parseInt(val, 10);
};

String.convertToLowerCase = (val: any) => {
	return val === undefined ? val : val.toLowerCase();
};

String.prototype.upperFirstLetter = function(this: string) {
	return this.toLowerCase().charAt(0).toUpperCase() + this.slice(1);
};

export { };
