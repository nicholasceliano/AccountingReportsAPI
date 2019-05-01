import express = require('express');
import { Accounts } from '../../services/Accounts';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	res.sendAPIResponse(new Accounts(req.apiCredentails).list());
});

router.get('/:id', (req, res) => {
	res.sendAPIResponse(new Accounts(req.apiCredentails).get(req.params.id));
});

module.exports = router;
