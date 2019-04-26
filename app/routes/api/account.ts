import express = require('express');
import { Accounts } from '../../services/Accounts';

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {

	// params options
		// type=history
		// dateInc=week,month,day

	res.sendAPIResponse(new Accounts(req.apiCredentails).list());

});

module.exports = router;
