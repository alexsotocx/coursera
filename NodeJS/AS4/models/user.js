var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongose = require('passport-local-mongoose');

var User = new Schema({
	username: String,
	password: String,
	firstname: {type: String, default: ''},
	lastname: {type: String, default: ''},
	admin: {
		type: Boolean,
		default: false
	}
});

User.methods.getName = function() {
	return (this.name + " " + this.lastname);
}

User.plugin(passportLocalMongose);
module.exports = mongoose.model('User', User);