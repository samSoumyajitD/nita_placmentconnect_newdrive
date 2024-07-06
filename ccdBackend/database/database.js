const { MongoClient, ServerApiVersion } = require('mongodb');
const { createCollection } = require('./database_schema');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await createCollection(client);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

module.exports = { client, connectMongoDB };
