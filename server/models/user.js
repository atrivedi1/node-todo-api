const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is note a valid emaila address!'
		}
	},
	
	password: {
		type: String,
		required: true,
		minlength: 6
	},

	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

/*CUSTOM MIDDLEWARE */
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {

    let newPassword = user.password;
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, newHash) => {
        user.password = newHash;
        next();
      });
    });
  } else {
    next();
  }
});

/*CUSTOM USER METHODS
NOTE: using reg es5 function as we need to be able to bind to this*/

//.methods => instance methods
UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
 let user = this;
 let access = 'auth';
 var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

 user.tokens = user.tokens.concat([{access, token}]);
 
 return user.save().then(() => {
 	return token;
 });
};

//.statics => model methods
UserSchema.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, 'abc123')
	}

	catch (e) {
		return Promise.reject('Unable to authenticate user; invalid token')
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

UserSchema.statics.findByCredentials = function(email, password) {
		let User = this; 

	  return User.findOne({email})
	  	.then((user) => {
	  		if(!user) {
	  			return Promise.reject();
	  		}

	  		return new Promise((resolve, reject) => {
	    		bcrypt.compare(password, user.password, (err, res) => {
	      		if(res) {
	      			resolve(user);
	      		} 

	      		else {
	      			reject();
	      		}
	  			});
    		})
		})
}

//User Model
const User = mongoose.model('User', UserSchema);

module.exports = {User}