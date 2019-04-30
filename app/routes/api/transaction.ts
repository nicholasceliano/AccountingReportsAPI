import express = require('express');
import { Transactions } from '../../services/Transactions';
import { TransactionValidator } from '../validators/TransactionValidator';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	const accountId = String.convertToLowerCase(req.query.accountId);

	res.sendAPIResponse(new Transactions(req.apiCredentails).list(accountId), new TransactionValidator(accountId));
});

module.exports = router;
