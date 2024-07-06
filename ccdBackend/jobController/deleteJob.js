const { client } = require('../database/database');
const { ObjectId } = require('mongodb');

async function deleteJob(req, res) {
  try {
    const id = req.params.id;
    const db = client.db('Job_Listing'); // Select the Job_Listing database
    const collection = db.collection('jobs'); // Select the jobs collection

    const filter = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      res.status(404).send('Job listing not found');
    } else {
      res.send(`Job listing with ID ${id} deleted successfully`);
    }
  } catch (err) {
    console.error('Failed to delete job listing:', err);
    res.status(500).send('Failed to delete job listing');
  }
}

module.exports = { deleteJob };
