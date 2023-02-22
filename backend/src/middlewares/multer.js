const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  console.log("Image file in body")
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter });
