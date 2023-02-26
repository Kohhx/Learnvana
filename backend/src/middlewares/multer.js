const multer = require("multer");
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  cb(null, true);
};

const allFileFilter = (req, file, cb) => {
  cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only video files", false);
  }
  cb(null, true);
};

exports.uploadImage = multer({ storage, imageFileFilter });
exports.uploadAllFile = multer({ storage, allFileFilter });
exports.uploadVideo = multer({ storage, videoFileFilter });
