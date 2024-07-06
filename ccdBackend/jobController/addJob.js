const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

async function addJob(req, res) {
  try {
    const jobListing = { ...req.body, postDate: new Date(), postTime: new Date().toLocaleTimeString() }; // Add postDate and postTime fields
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection
    
    const result = await collection.insertOne(jobListing); // Insert the job listing into the collection
    
    res.status(201).send(`Job listing added with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Failed to add job listing:', err);
    res.status(500).send('Failed to add job listing');
  }
}

module.exports = { addJob };
