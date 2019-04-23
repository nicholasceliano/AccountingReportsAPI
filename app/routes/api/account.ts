import express = require('express');
import { Accounts } from '../../services/Accounts';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	const accounts = new Accounts(req.apiCredentails).list();

	res.send(accounts);
});

module.exports = router;
