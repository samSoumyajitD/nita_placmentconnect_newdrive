const { client } = require('../database/database');
const bcrypt = require('bcrypt');

async function createUser(user) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');
  
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  
  const result = await collection.insertOne(newUser);
  return result.insertedId;
}

async function findUserByEnrollmentNumber(enrollmentNumber) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');
  
  const user = await collection.findOne({ enrollmentNumber });
  return user;
}

async function findUserByEmail(email) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');
  
  const user = await collection.findOne({ email });
  return user;
}

async function findUserByRegistrationNumber(registrationNumber) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');
  
  const user = await collection.findOne({ registrationNumber });
  return user;
}
async function updateUserResetToken(userId, resetToken, resetTokenExpiry) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');

  await collection.updateOne(
    { _id: userId },
    { $set: { resetToken, resetTokenExpiry } }
  );
}

async function findUserByResetToken(resetToken) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');

  const user = await collection.findOne({ resetToken });
  return user;
}

async function updateUserPassword(userId, newPassword) {
  const db = client.db('Job_Listing');
  const collection = db.collection('users');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await collection.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword, resetToken: null, resetTokenExpiry: null } }
  );
}
module.exports = { createUser, findUserByEnrollmentNumber, findUserByEmail, findUserByRegistrationNumber, updateUserResetToken, findUserByResetToken, updateUserPassword };
