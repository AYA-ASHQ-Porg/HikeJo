const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hikejo/trips',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  },
});

const upload = multer({ storage });
module.exports = upload;
