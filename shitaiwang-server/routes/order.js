var express = require('express');
var httpResult = require('../config');
var query = require('../utils/dbHelper.js');
var router = express.Router();
var Token = require('../utils/token.js');

router.get('/all/:id',function(req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'SELECT * FROM `dt_product` WHERE `id` = ?;';
    res.myPromise = query(sql, [id])
        .then(results =>httpResult.success(results[0]));
    next();
});
//尝试使用购物车请求列表的模式
router.post('/list/:id',Token.check,function(req, res, next) {
    var id = parseInt(req.params.id);
    res.myPromise = query('CALL p_getCartInfo(?);', [ id ])
        .then(results => httpResult.success(results[0]));
    next();
});



router.post('/address', function(req, res, next) {
	var isDefault = parseInt(req.body.isDefault);
	var sql = 'SELECT * FROM `dt_address`;';
	res.httpResult = query(sql, [isDefault])
		.then(results => httpResult.success((results[0])));
	next();
})

module.exports = router;