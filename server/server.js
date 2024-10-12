
const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');
const express = require('express');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(express.json());
app.use('/api/jobs', jobRoutes);

 // Synchronize database
sequelize.sync()
.then(() => {
  console.log('Database synchronized');
  // Start the server after syncing
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Unable to synchronize database:', error);
});