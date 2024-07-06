const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

async function getAllJobs(req, res) {
  try {
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection

    let query = {};
    if (req.query?.category) {
      query = { category: req.query.category };
    }

    const result = await collection.find(query).toArray();
    res.send(result);
  } catch (err) {
    console.error('Failed to fetch job listings:', err);
    res.status(500).send('Failed to fetch job listings');
  }
}

async function getJobById(req, res) {
  try {
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection
    
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await collection.findOne(filter);
    
    if (!result) {
      res.status(404).send('Job listing not found');
    } else {
      res.send(result);
    }
  } catch (err) {
    console.error('Failed to fetch job listing:', err);
    res.status(500).send('Failed to fetch job listing');
  }
}

module.exports = { getAllJobs, getJobById };
