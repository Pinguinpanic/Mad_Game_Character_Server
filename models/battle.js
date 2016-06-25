var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Battle = new Schema({
    id: Number,
    date: String,
    users: [String],
    userCount: Number,
    battleLog: String
});

module.exports = mongoose.model('Battle', Battle);
