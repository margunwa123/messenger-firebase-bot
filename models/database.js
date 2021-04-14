const admin = require("firebase-admin");
const serviceAccountKey = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccountKey.private_key,
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
    }),
  });
}
const db = admin.firestore();

module.exports = {
  db,
  admin,
};
