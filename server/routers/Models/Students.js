const mangoose = require('mongoose');
var studentSchema = mangoose.Schema({
  Name:  String, // String is shorthand for {type: String}
  FatherName: String,
  Fees:   Number,
  class: String,
  Passed: { type: String, default:'Yes'}
});
module.exports = mangoose.model('studentSchema',studentSchema);
