var bcrypt = require('bcryptjs');
var validation = require('../public/javascripts/validation');
var debug = require('debug')('signin:user');

module.exports = function(db) {
	var users = db.collection('users');
	debug("users collection is: ", users);
	users.findUser = function(name, password) {
		return users.findOne({username: name}).then(function(user) {
			return user ? bcrypt.compare(password, user.password).then(function(res) {
				if (res) return user;
				else throw new Error();
			}) : Promise.reject("User does not exist!");
		});
	}

	users.createUser = function(user) {
		return bcrypt.genSalt(10, function(err, salt) {
			return bcrypt.hash(user.password, salt, function(err, hash) {
    			if (err) throw err;
    			user.password = user.recheck = hash;
    			return users.insert(user);
			});
		});
	}
	
	users.checkUser = function(user) {
		var formatErrors = validation.findFormatErrors(user);
		return new Promise(function(resolve, reject) {
			formatErrors ? reject(formatErrors) : resolve(user);
		}).then(function() {
			return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
				debug("existed user: ", existedUser);
				return existedUser ? Promise.reject("user is not unique") : Promise.resolve(user);
			});
		})
	}
	return users;	
}

function getQueryForUniqueInAttributes(user) {
	var list = [];
	list.push({"username": user.username});
	list.push({"id": user.id});
	list.push({"phone": user.phone});
	list.push({"email": user.email});
	debug(list);
	return {$or: list};
}
