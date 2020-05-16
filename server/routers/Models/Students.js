const mangoose1 = require('mongoose');
var studentSchema = mangoose1.Schema({
  Name:  String, // String is shorthand for {type: String}
  FatherName: String,
  Fees:   Number,
  class: String,
  Passed: { type: String, default:'Yes'}
});
module.exports = mangoose1.model('studentSchema',studentSchema);
