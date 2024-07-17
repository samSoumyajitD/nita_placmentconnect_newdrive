// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB } = require('./database/database');
const { addJob } = require('./jobController/addJob');
const { getAllJobs, getJobById } = require('./jobController/getJobs');
const { deleteJob } = require('./jobController/deleteJob');
const { updateJob } = require('./jobController/updateJob');
const { downloadCSV } = require('./jobController/downloadCSV');
const { signUp, login, requestPasswordReset, resetPassword } = require('./useController/userController');

const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World! This is your Node.js server.\n');
});

// Job routes
app.post('/add-job', addJob);
app.get('/all-jobs', getAllJobs);
app.get('/jobs/:id', getJobById);
app.patch('/job/:id', updateJob);
app.delete('/job/:id', deleteJob);
app.get('/download-csv', downloadCSV);

// User routes
app.post('/sign-up', signUp);
app.post('/login', login);
// Password reset routes
app.post('/request-password-reset', requestPasswordReset);
app.post('/reset-password/:token', resetPassword);
async function startServer() {
  await connectMongoDB();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);
