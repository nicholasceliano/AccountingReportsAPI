import express = require('express');
import { Stocks } from '../../services/Stocks';
import { StockValidator } from '../validators/StockValidator';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	const type = String.convertToLowerCase(req.query.type);
	const id = String.convertToLowerCase(req.query.id);
	const historyType = String.convertToLowerCase(req.query.historyType);
	const historyMonths = String.convertToNumber(req.query.historyMonths);

	if (new StockValidator(type, id, historyType, historyMonths).validate()) {
		res.sendAPIResponse(new Stocks(req.apiCredentails).list(type, id, historyType, historyMonths));
	} else {
		res.APIError(400, 'Invalid query parameters: type(required), id, historyType, historyMonths');
	}
});

module.exports = router;
