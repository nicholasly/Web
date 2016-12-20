var express = require('express');
var router = express.Router();
var validation = require('../public/javascripts/validation');
var debug = require('debug')('signin:index');

module.exports = function(db) {
	var database = require('../models/user')(db);
	/* GET signup page. */
	router.get('/regist', function(req, res, next) {
		res.render('signup', { title: '注册', user: {}});
	});

	router.get('/', function(req, res, next) {
		if (req.query.username == undefined) {
			if (req.session.user) res.redirect('/detail');
			else res.redirect('/signin');
		} else {
			if (req.session.user) {
				if (req.session.user.username == req.query.username) res.redirect('/detail');
				else res.render('detail', { title: '详情', user: req.session.user, error: "只能够访问自己的数据"}); 	
			}
			if (!req.session.user) res.redirect('/signin');
		}
	});

	/* GET signin page. */
	router.get('/signin', function(req, res, next) {
		if (req.session.user) {
			res.redirect('/detail');
		}
		else res.render('signin', { title: '登录'});
	});

	/* GET signout page. */
	router.get('/signout', function(req, res, next) {
		if (req.session.user) delete req.session.user;
		res.redirect('/signin');
	});

	router.get('');

	/* POST signin page. */
	router.post('/signin', function(req, res, next) {
		var params = req.body;
		database.findUser(params.username, params.password).then(function(user) {
			req.session.user = user;
			res.redirect('/detail');
		}).catch(function(err) {
			debug("catch the login error!");
			res.render('signin', { title: '登录', error: "错误的用户名或者密码"});
		});
	});

	/* POST signup page. */
	router.post('/regist', function(req, res, next) {
		var params = req.body;
		var user = {
			username : params.username,
			id : params.id,
			password : params.password,
			recheck : params.recheck,
			phone : params.phone,
			email : params.email
		};
		database.checkUser(user)
		.then(database.createUser)
		.then(function() {
			req.session.user = user;
			res.redirect('/detail');
		}).catch(function(err) {
			res.render('signup', {title: '注册', user: user, error: err.message});
		});
	});

	router.all(	'*', function(req, res, next) {
		req.session.user ? next() : res.redirect('/signin');
	});

	/* GET detail page. */
	router.get('/detail', function(req, res, next) {
		res.render('detail', { title: '详情', user: req.session.user});
	});

	return router;
}
