
const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');
const express = require('express');
const jobRoutes = require('./routes/jobs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: 'http://localhost:3000', // TODO: replace with env var
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());
app.use('/api/jobs', jobRoutes);

 // Synchronize database
sequelize.sync()
.then(() => {
  console.log('Database synchronized');
})
.catch((error) => {
  console.error('Unable to synchronize database:', error);
});

// Routes
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});