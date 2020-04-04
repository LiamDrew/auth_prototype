let mongoose = require('mongoose');
let validator = require('validator');

let profileSchema = new mongoose.Schema({
  task: Object
})

module.exports = mongoose.model('profile', profileSchema);
