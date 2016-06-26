var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Battle = new Schema({
    date: String,
    participaters: [String],
    userCount: Number,
    battleLog: [String]
});

module.exports = mongoose.model('Battle', Battle);
