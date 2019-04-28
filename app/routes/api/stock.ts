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
	const validator = new StockValidator(type, id, historyType, historyMonths);

	res.sendAPIResponse(new Stocks(req.apiCredentails).list(type, id, historyType, historyMonths), validator);
});

module.exports = router;
