var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('../models/item');
var Battle = require('../models/battle');
var Quest = require('../models/quest');
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	colour: String,
	level: Number,
	xp: Number,
	nextxp: Number,
	trunk: [Item.schema],
	helmet: [Item.schema],
	armor: [Item.schema],
	weapon: [Item.schema],
        totalarmor: Number,
        totaldamage: Number,
	battles: [Battle.schema],
	quests: [Quest.schema],
	lastBattle : [Battle.schema],
	lastBattleFresh : false,
	participating: Boolean,
	fresh: Boolean
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
