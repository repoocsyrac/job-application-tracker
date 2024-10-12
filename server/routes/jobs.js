
const express = require('express');
const verifyToken = require('../middleware/auth');
const createUserIfNotExists = require('../middleware/createUserIfNotExists');
const Job = require('../models/Job');

const router = express.Router();

router.post('/add', verifyToken, createUserIfNotExists, async (req, res) => {
  const { companyName, jobTitle, applicationLink, location, closingDate, status } = req.body;

  try {
    const job = await Job.create({
      userId: req.dbUser.id,
      companyName,
      jobTitle,
      applicationLink,
      location,
      closingDate,
      status
    });

    res.status(201).json({ message: 'Job added successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

router.get('/', verifyToken, createUserIfNotExists, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.dbUser.id }
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

router.put('/:id', verifyToken, createUserIfNotExists, async (req, res) => {
  const jobId = req.params.id;
  const { companyName, jobTitle, applicationLink, location, closingDate, status } = req.body;

  try {
    // Check if job belongs to the authenticated user
    const job = await Job.findOne({ where: { id: jobId, userId: req.dbUser.id } });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or not authorized' });
    }

    // Update job with new details
    await job.update({ companyName, jobTitle, applicationLink, location, closingDate, status });
    res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
});

module.exports = router;