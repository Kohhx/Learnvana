const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

multer({ storage, fileFilter });
