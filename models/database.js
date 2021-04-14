const admin = require("firebase-admin");
require("dotenv").config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
    }),
  });
}
const db = admin.firestore();

module.exports = {
  db,
  admin,
};
