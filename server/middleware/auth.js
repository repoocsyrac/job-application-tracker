const admin = require('firebase-admin');
//admin.initializeApp();

var serviceAccount = require("../job-application-tracker-a65c5-firebase-adminsdk-lbrm9-9bacf85a62.json");

admin.initializeApp({

  credential: admin.credential.cert(serviceAccount)

});


const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Received token by middleware:", token); // DEBUG
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken); // Log token details for debugging
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log error details
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;