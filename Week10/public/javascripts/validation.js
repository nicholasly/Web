var validation = {
	form: {
		username: {
			status: false,
			errorMessage: '用户名：请输入6~18位英文字母、数字或下划线，必须以英文字母开头\n'
		},
		id: {
			status: false,
			errorMessage: '学号：请输入8位数字，不能以0开头\n'
		},
		password: {
			status: false,
			errorMessage: '密码：请输入6~12位数字、大小写字母、中划线、下划线'
		},
		recheck: {
			status: false,
			errorMessage: '确认密码：请输入一致的密码'
		},
		phone: {
			status: false,
			errorMessage: '电话：请输入11位数字，不能以0开头\n'
		},
		email: {
			status: false,
			errorMessage: '邮箱：请按照正确的邮箱格式输入\n'
		}
	},

	findFormatErrors: function(user) {
		var errorMessages = '';
		for (var key in user) {
			if (user.hasOwnProperty(key)) {
				if (!validation.isFieldValid(key, user[key])) errorMessages = validation.form[key].errorMessage;
			}
		}
		if (errorMessages.length > 0) throw new Error(errorMessages);
	},

	isUsernameValid: function(username) {
		return this.form.username.status = /^[a-z,A-Z]\w{5,15}$/.test(username);
	},

	isIdValid: function(id) {
		return this.form.id.status = /^[1-9]\d{7}$/.test(id);
	},

	isPasswordValid: function(password) {
		this.password = password;
		return this.form.password.status = /^[a-zA-Z][a-zA-Z0-9_\-]{6,12}$/.test(password);
	},

	isRecheckValid: function(recheck) {
		console.log(recheck);
		var flag = false;
		if (recheck == this.password) flag = true;
		return this.form.recheck.status = flag;
	},

	isPhoneValid: function(phone) {
		return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
	},

	isEmailValid: function(email) {
		return this.form.email.status = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/.test(email);
	},

	isFieldValid: function(fieldname, value) {
		var CapFilename = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
		return this["is" + CapFilename + 'Valid'](value);
	},

	isFormValid: function() {
		return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
	},

	getErrorMessage: function(fieldname) {
		return this.form[fieldname].errorMessage;
	},

	isAttrValueUnique: function(registry, user, attr) {
		for (var key in registry) {
			if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
		}
		return true;
	}
};

if (typeof module == 'object') {
	module.exports = validation;
}