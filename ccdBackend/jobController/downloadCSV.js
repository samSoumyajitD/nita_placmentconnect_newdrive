// jobController/downloadCSV.js
const { client } = require('../database/database');
const { createObjectCsvStringifier } = require('csv-writer');
const { ObjectId } = require('mongodb');

async function downloadCSV(req, res) {
  try {
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection

    const jobs = await collection.find({}).toArray();

    // Get the selected attributes from query parameters
    const selectedAttributes = req.query.attributes ? req.query.attributes.split(',') : [];

    // Define the complete schema
    const schema = {
      _id: 'ID',
      company: 'Company',
      roles: 'Roles',
      companyTier: 'Company Tier',
      ctc: 'CTC',
      roleType: 'Role Type',
      mini10thMarksRequired: '10th Marks Required',
      mini12thMarksRequired: '12th Marks Required',
      cgpa: 'CGPA',
      branchesAllowed: 'Branches Allowed',
      degreesAllowed: 'Degrees Allowed',
      graduationYearsAllowed: 'Graduation Years Allowed',
      selectionProcess: 'Selection Process',
      noofgapYearsAllowed: 'Number of Gap Years Allowed',
      allowBackloghis: 'Allow Backlog History',
      activeBacklogsAllowed: 'Active Backlogs Allowed',
      postDate: 'Post Date',
      deadline: 'Deadline',
      jobDDomCode: 'Job Description',
      gender: 'Gender',
      facultyCoordinator: 'Faculty Coordinator',
      studentCoordinator: 'Student Coordinator',
      fillfrom: 'Fill From',
      items: 'Items',
      mitems: 'MItems',
    };

    // Filter the schema based on selected attributes
    const filteredSchema = selectedAttributes.length > 0
      ? selectedAttributes.map(attr => ({ id: attr, title: schema[attr] }))
      : Object.keys(schema).map(attr => ({ id: attr, title: schema[attr] }));

    const csvStringifier = createObjectCsvStringifier({
      header: filteredSchema,
    });

    // Filter the jobs data to include only selected attributes
    const filteredJobs = jobs.map(job => {
      const filteredJob = {};
      filteredSchema.forEach(attr => {
        filteredJob[attr.id] = job[attr.id];
      });
      return filteredJob;
    });

    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(filteredJobs);

    res.setHeader('Content-Disposition', 'attachment; filename=jobs.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.send(header + records);
  } catch (err) {
    console.error('Failed to download CSV:', err);
    res.status(500).send('Failed to download CSV');
  }
}

module.exports = { downloadCSV };
