const { google } = require('googleapis');

// Load the service account credentials
const serviceAccount = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  project_id: process.env.GOOGLE_PROJECT_ID
};

// Create a new JWT client using the service account
const auth = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/photoslibrary']
);

module.exports = auth;