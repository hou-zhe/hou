var express = require('express');
var httpResult = require('../config');
var query = require('../utils/dbHelper.js');
var router = express.Router();
var Token = require('../utils/token.js');


router.post('/list',Token.check, function(req,res,next) {
	var name = req.token.name;
	res.myPromise = query('SELECT * FROM `v_pay` WHERE `customerName` = ?;',[name])
		.then(results => httpResult.success(results));
	next();
});

router.post('/cartlist',Token.check,function(req, res, next) {
    var name = req.token.name;
    res.myPromise = query('CALL p_getCartInfo(?);', [ name ])
        .then(results => httpResult.success(results[0]));
    next();
});

module.exports = router;