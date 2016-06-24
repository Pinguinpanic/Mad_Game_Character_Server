var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
	name: String,
	type: String,
	damage: Number,
	armor: Number
});

module.exports = mongoose.model('Item', Item);
