const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

async function updateJob(req, res) {
  try {
    const id = req.params.id;
    const updateJobData = req.body;
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection

    const filter = { _id: new ObjectId(id) };
    const updatedDoc = { $set: { ...updateJobData } };

    const result = await collection.updateOne(filter, updatedDoc);

    if (result.matchedCount === 0) {
      res.status(404).send('Job listing not found');
    } else {
      res.send(`Job listing with ID ${id} updated successfully`);
    }
  } catch (err) {
    console.error('Failed to update job listing:', err);
    res.status(500).send('Failed to update job listing');
  }
}

module.exports = { updateJob };
