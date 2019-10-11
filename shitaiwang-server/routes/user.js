var express = require('express');
var router = express.Router();
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var Token = require('../utils/token.js');
var code = '';
// 用户名密码登录
router.post('/login/pwd', function(req,res,next) {
	var {account,pwd } = req.body;
	var sql = 'SELECT `tel` FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
	var params = [account, pwd];
	res.myPromise = query(sql,params)
		.then(results => {
			if(results[0]){
				return httpResult.success(Token.generate({name: account}));
			}else  {return httpResult.failure(null,'用户名或密码错误')}
		});
		next();
});
// 验证码
router.get('/login/getcode', function(req, res, next) {
	code = '000000' + Math.floor(Math.random()*1000000).toString();
	code = code.substr(-6);
	req.session.code = code;
	res.myPromise = Promise.resolve(httpResult.success(code));
	next();
});

// 手机号登录
router.post('/login/phone', function(req,res,next) {
	var phone = req.body.tel;
	var code = req.body.code;
		res.myPromise = query('SELECT count(*) AS count FROM `dt_user` WHERE `tel` = ?;',[ phone ])
		.then(results => {
			if(results[0].count ===1 ){
				req.session.phone = phone;
				return httpResult.success(Token.generate({phone: phone}));
			}else return httpResult.failure(null,'手机号未注册');
		});
		next();
	if(req.session.code !== code){
		res.myPromise = Promise.resolve(httpResult.failure(null,'验证码错误'));
		return;
	}
});


router.post('/login/admin', function(req,res,next) {
	 var { name, pwd } = req.body;
	res.myPromise = query('SELECT count(*) AS count FROM `dt_admin` WHERE `name` = ? AND `pwd` = ?;', [ name, pwd ])
	    .then(results => {
	        if(results[0].count > 0) {
	            // 算出token并返回
	            return httpResult.success(Token.generate({name: name}));
	        }else {
	            return httpResult.failure(null, '用户名或密码错误');
	        }
	    });
	next();
});

router.post('/changepwd', Token.check, function(req, res,next) {
	var name = req.token.name;
	var { oldPwd, newPwd } = req.body;
	res.myPromise = query('CALL p_password(?,?,?);', [ name,oldPwd,newPwd ])
	    .then(results => {
	        if(results[0][0].result === '') {
	            // 算出token并返回
	            return httpResult.success(null,'新密码修改成功');
	        }else {
	            return httpResult.failure(null, '原始密码错误');
	        }
	    });
	next();
});


router.post('/getlist', Token.check, function(req, res,next) {
	var name = req.token.name;
	res.myPromise = query('SELECT * FROM `dt_personal`;')
	    .then(results =>httpResult.success(results[0]));
	next();
});

router.post('/update',function(req,res,next) {
	var {trueName, sex, brithday, address} = req.body;
	var sql = 'UPDATE `dt_personal` SET `trueName` = ?, `sex` = ?, `brithday` = ?, `address` = ?;';
	res.myPromise = query(sql, [trueName, sex, brithday, address])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null,'地址修改失败');
		});
	next();
});

module.exports = router;