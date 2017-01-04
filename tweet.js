var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  content: String,
  key: String
});

module.exports = mongoose.model('Tweet', TweetSchema);
