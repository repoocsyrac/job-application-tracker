/*const User = require('../models/User');

const createUserIfNotExists = async (req, res, next) => {
  const firebaseUid = req.user.uid;
  const email = req.user.email;

  try {
    // Check if user exists in PostgreSQL
    let user = await User.findOne({ where: { firebaseUid } });

    // If not, create the user
    if (!user) {
      user = await User.create({ firebaseUid, email });
    }

    // Attach user info to the request object
    req.dbUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking/creating user', error });
  }
};

module.exports = createUserIfNotExists;*/

const attachFirebaseUid = (req, res, next) => {
  try {
    // Attach Firebase UID to the request object
    req.firebaseUid = req.user.uid;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error attaching Firebase UID', error });
  }
};

module.exports = attachFirebaseUid;