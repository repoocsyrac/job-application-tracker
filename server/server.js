const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');

sequelize.sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch(err => console.log("Error synchronizing database", err));