const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key    : process.env.API_KEY,
    api_secret : process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'keydwellDev',
    allowerdFormate : ['jpg' , 'png' , 'jpeg']
  },
});
module.exports = {
    storage,
    cloudinary
}
