var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	tier: Number,
	name: String,
	type: String,
	subtype: String,
	damage: Number,
	armor: Number,
	fresh: Boolean,
	chest: String
});

module.exports = mongoose.model('Item', Item);
