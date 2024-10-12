
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

module.exports = router;