var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('../models/item');
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	trunk: [Item.schema],
	helmet: [Item.schema],
	armor: [Item.schema],
	weapon: [Item.schema],
	participating: Boolean
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
