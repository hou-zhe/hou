
'use strict';
var express = require('express');
var router = express.Router();
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var Token = require('../utils/token.js')


router.post('/addproduct', Token.check, function(req,res,next) {
    var pid = parseInt(req.body.pid);
    var count = parseInt(req.body.count);
    var name = req.token.name;
    res.myPromise = query('CALL p_addProductToCart(?,?,?,?);',[name, pid, count, new Date()])
        .then(results =>{
        	if(results[0][0].result === '')
        		return httpResult.success(results[0][0].result);
        	else 
        		return httpResult.failure(null,results[0][0].result);
        });
        next();
});

router.get('/getcount',  function(req,res,next) {
    // 这里是伪造的，因为没有做登录功能，实际这里的name应该从session中去获取
    var name = req.token.name;
    res.myPromise = query('SELECT sum(`count`) as count FROM `dt_cart` WHERE `name` = ?;',[name])
        .then(results => httpResult.success(results[0].count || 0));
        next();
});

router.post('/list',Token.check,function(req, res, next) {
    var name = req.token.name;
    res.myPromise = query('CALL p_getCartInfo(?);', [ name ])
        .then(results => httpResult.success(results[0]));
    next();
});

// 加数量
router.get('/increase/:id',Token.check, function(req,res,next) {
    var id = parseInt(req.params.id);
    res.myPromise = query('UPDATE `dt_cart` SET `count` = `count` + 1 WHERE `id` = ?;', [ id ])
        .then(results => {
            if(results.affectedRows === 1 ) return httpResult.success();
            else return httpResult.faliure(null, '失败..');
            });
    next();
});

router.get('/decrease/:id',Token.check, function(req,res,next) {
    var id = parseInt(req.params.id);
    res.myPromise = query('UPDATE `dt_cart` SET `count` = `count` - 1 WHERE `id` = ?;', [ id ])
        .then(results => {
            if(results.affectedRows === 1 ) return httpResult.success();
            else return httpResult.faliure(null, '失败..');
            });
    next();
});

router.post('/delete',Token.check, function(req,res,next) {
    var ids = JSON.parse(req.body.ids);
    res.myPromise = query('DELETE FROM `dt_cart` WHERE `id` IN (?);',[ids])
        .then(result => {
            if(result.affectedRows === ids.length) return httpResult.success();
            else return httpResult.faliure(null,'删除失败哦');
        });
    next();
});

router.post('/settlement',Token.check, function(req,res,next) {
    var ids = JSON.parse(req.body.ids).join(',');
    var account = parseInt(req.body.account);
	var addressId = parseInt(req.body.addressId);
    var name = req.token.name;
    res.myPromise = query('CALL p_settlement(?,?,?,?,?);', [ids, account, new Date(), name, addressId])
        .then(() => httpResult.success());
    next();
});


router.post('/settlemented',Token.check, function(req,res,next) {
    var ids = JSON.parse(req.body.ids).join(',');
    var account = parseInt(req.body.account);
	var addressId = parseInt(req.body.addressId);
    var name = req.token.name;
    res.myPromise = query('CALL p_settlemented(?,?,?,?,?);', [ids, account, new Date(), name, addressId])
        .then(() => httpResult.success());
    next();
});


module.exports = router;

