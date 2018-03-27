var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quest = new Schema({
	name: String,
	tier: Number,	
	xp: Number,
	danger: Number,
	difficulty: Number,
	time: Number,
	start: Date,
	end: Date
});

module.exports = mongoose.model('Quest', Quest);
