var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('../models/item');
var Battle = require('../models/battle');
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	level: Number,
	trunk: [Item.schema],
	helmet: [Item.schema],
	armor: [Item.schema],
	weapon: [Item.schema],
        totalarmor: Number,
        totaldamage: Number,
	battles: [Battle.schema],
	lastBattle : [Battle.schema],
	participating: Boolean
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
