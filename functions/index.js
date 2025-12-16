const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendMfaCode = functions.https.onCall(async (data, context) => {
  const { email, uid } = data;

  if (!email || !uid) {
    throw new functions.https.HttpsError("invalid-argument", "Missing email or uid.");
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  await admin.firestore().collection("mfaCodes").doc(uid).set({
    code,
    expiresAt,
  });

  const msg = {
    to: email,
    from: "no-reply@yourapp.com",
    subject: "Your MFA Verification Code",
    text: `Your code is ${code}. It expires in 5 minutes.`,
  };

  await sgMail.send(msg);

  return { success: true };
});