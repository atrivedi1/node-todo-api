const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
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

//using reg es5 function as we need to be able to bind to this
UserSchema.methods.generateAuthToken = function() {
 let user = this;
 let access = 'auth';
 var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

 user.tokens = user.tokens.concat([{access, token}]);
 
 return user.save().then(() => {
 	return token;
 });
};

UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email'])
}

//User Model
const User = mongoose.model('User', UserSchema);

module.exports = {User}