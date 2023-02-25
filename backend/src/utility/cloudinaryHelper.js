const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CloudinaryName",process.env.CLOUDINARY_NAME)

exports.uploadPhoto = async (file) => {
  if (file) {
    try {
      return await cloudinary.uploader.upload(file.path);
    } catch (error) {
      res.status(400);
      next(new Error(error));
    }
  } else {
    res.status(400);
    next(new Error("No image file found"));
  }
};

exports.deletePhoto = async (public_id) => {
  if (public_id) {
    // Check if there avatar exist
    try {
      const { result: destroyRes } = await cloudinary.uploader.destroy(
        public_id,
        {
          resource_type: "image",
        }
      );
      return destroyRes;
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
};
