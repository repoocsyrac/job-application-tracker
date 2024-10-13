const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicationLink: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  firebaseUid: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Job;