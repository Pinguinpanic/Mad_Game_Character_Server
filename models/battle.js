var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Battle = new Schema({
    id: Number,
    date: String,
    users: [String],
    userCount: Number
});

module.exports = mongoose.model('Battle', Battle);
