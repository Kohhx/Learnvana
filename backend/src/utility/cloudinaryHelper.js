const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadPhoto = async (file) => {
  if (file) {
    try {
      return await cloudinary.uploader.upload(
        file.path
      );
    } catch (error) {
      res.status(400);
      next(new Error(error));
    }
  } else {
    res.status(400);
    next(new Error("No image file found"));
  }
};
