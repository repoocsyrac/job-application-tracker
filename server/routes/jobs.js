
const express = require('express');
const verifyToken = require('../middleware/auth');
const attachFirebaseUid = require('../middleware/attachFirebaseUid');
const Job = require('../models/Job');

const router = express.Router();

router.post('/add', verifyToken, attachFirebaseUid, async (req, res) => {
  const { companyName, jobTitle, applicationLink, location, closingDate, status } = req.body;

  try {
    const job = await Job.create({
      companyName,
      jobTitle,
      applicationLink,
      location,
      closingDate,
      status,
      firebaseUid: req.firebaseUid
    });

    res.status(201).json({ message: 'Job added successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

router.get('/', verifyToken, attachFirebaseUid, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { firebaseUid: req.firebaseUid }
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

router.put('/:id', verifyToken, attachFirebaseUid, async (req, res) => {
  const jobId = req.params.id;
  const { companyName, jobTitle, applicationLink, location, closingDate, status } = req.body;

  try {
    // Check if job belongs to the authenticated user
    const job = await Job.findOne({ where: { id: jobId, firebaseUid: req.firebaseUid } });
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

router.delete('/:id', verifyToken, attachFirebaseUid, async (req, res) => {
  const jobId = req.params.id;

  try {
    // Check if job belongs to the authenticated user
    const job = await Job.findOne({ where: { id: jobId, firebaseUid: req.firebaseUid } });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or not authorized' });
    }

    // Delete job from the database
    await job.destroy();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
});

module.exports = router;