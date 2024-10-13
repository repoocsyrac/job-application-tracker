
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables
const sequelize = require('./config/database'); // Import the Sequelize instance
const Job = require('./models/Job'); // Import the Job model
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); // Parse JSON bodies for incoming requests

app.use('/api/jobs', jobRoutes);

// Function to start the server
async function startServer() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models with the database
    await sequelize.sync();
    console.log('Database synchronized');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

/*
// Routes

// CREATE: Add a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, company, status, website } = req.body;
    const job = await Job.create({ title, company, status, website });
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// READ: Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// READ: Get a job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// UPDATE: Update a job by ID
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      const { title, company, status, website } = req.body;
      await job.update({ title, company, status, website });
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE: Delete a job by ID
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.destroy();
      res.json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});
*/
startServer();