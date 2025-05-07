const { google } = require('googleapis');
const auth = require('../../config/googleDrive');
const streamifier = require('streamifier');

class DriveService {
  constructor() {
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(fileBuffer, filename, mimeType = 'application/octet-stream') {
    try {
      const fileMetadata = {
        name: filename,
        mimeType
      };

      const media = {
        mimeType,
        body: streamifier.createReadStream(fileBuffer)
      };

      // Upload file to Google Drive
      const file = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink'
      });

      // Make the file publicly accessible
      await this.drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      return file.data.webViewLink;
    } catch (error) {
      console.error('Google Drive upload error:', error);
      throw new Error('Failed to upload file to Google Drive');
    }
  }

  async deleteFile(fileId) {
    try {
      await this.drive.files.delete({
        fileId
      });
    } catch (error) {
      console.error('Google Drive delete error:', error);
      throw new Error('Failed to delete file from Google Drive');
    }
  }
}

module.exports = new DriveService();