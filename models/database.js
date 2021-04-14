const admin = require("firebase-admin");
const serviceAccountKey = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.PRIVATE_KEY,
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
