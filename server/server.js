require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');
const express = require('express');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(express.json());
app.use('/api/jobs', jobRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch(err => console.log("Error synchronizing database", err));