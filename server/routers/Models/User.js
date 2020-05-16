const mangoose = require('mongoose');
var userSchema = mangoose.Schema({
  UserName:  String, // String is shorthand for {type: String}
  Password: String

  // UserName:  {type: String, required:true}, // String is shorthand for {type: String}
  // Password: { type: String, required: true}
});
module.exports = mangoose.model('userSchema' ,userSchema);
