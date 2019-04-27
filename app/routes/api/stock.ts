import express = require('express');
import { Stocks } from '../../services/Stocks';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {

	// params options
		// accountId '94d35bef878bb9d3c5b223a0e7052084', null
		// history in months

	res.sendAPIResponse(new Stocks(req.apiCredentails).list());
});

module.exports = router;
