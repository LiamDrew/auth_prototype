let mongoose = require('mongoose');
let validator = require('validator');

let profileSchema = new mongoose.Schema({
  admin: Boolean,
  name: String,
  email: String,
  age: String,
  password: String
})

module.exports = mongoose.model('profile', profileSchema);
