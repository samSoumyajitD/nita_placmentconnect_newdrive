const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  roles: { type: [String], required: true },
  companyTier: { type: String, required: true },
  ctc: { type: String, required: true },
  roleType: { type: String, required: true },
  mini10thMarksRequired: { type: mongoose.Decimal128 },
  mini12thMarksRequired: { type: mongoose.Decimal128 },
  cgpa: { type: mongoose.Decimal128 },
  branchesAllowed: { type: [String], required: true },
  degreesAllowed: { type: [String], required: true },
  graduationYearsAllowed: { type: [Number], required: true },
  selectionProcess: { type: String, required: true },
  noofgapYearsAllowed: { type: Number },
  allowBackloghis: { type: Boolean },
  activeBacklogsAllowed: { type: Number },
  postDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  jobDDomCode: { type: String },
  gender: { type: String },
  facultyCoordinator: { type: String, required: true },
  studentCoordinator: { type: String, required: true },

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
