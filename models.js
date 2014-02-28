
var Mongoose = require('mongoose');

var ActionTypeSchema = new Mongoose.Schema({
  		"name": String,
		"id": Number,
		"user_id": Number,
		"group_id": Number
});
exports.ActionType = Mongoose.model('ActionType', ActionTypeSchema);

var UserSchema = new Mongoose.Schema({
  		"name": String,
		"age": Number,
		"id": Number,
		"lifespan": Number
});
exports.User = Mongoose.model('User', UserSchema);

var GroupSchema = new Mongoose.Schema({
  		"name": String,
 		"id": Number,
		"user_id": Number
});
exports.Group = Mongoose.model('Group', GroupSchema);

var ActionSchema = new Mongoose.Schema({
		"id": String,
		"user_id": Number,
		"date": Date
});
exports.Action = Mongoose.model('Action', ActionSchema);

var PastLifeSpanSchema = new Mongoose.Schema({
		"id": String,
		"lifespan": Number,
		"date": Date
});
exports.Lifespans = Mongoose.model('Lifespans', PastLifeSpanSchema);
