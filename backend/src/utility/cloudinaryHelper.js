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
    console.log("FILE", file)
    try {
      return await cloudinary.uploader.upload(file.path,   {
        resource_type: "image",
      });
    } catch (error) {
      res.status(400);
      next(new Error(error));
    }
  } else {
    res.status(400);
    next(new Error("No image file found"));
  }
};

exports.uploadVideo = async (file) => {
  if (file) {
    try {
      return await cloudinary.uploader.upload(file.path,   {
        resource_type: "video",
      });
    } catch (error) {
      res.status(400);
      next(new Error(error));
    }
  } else {
    res.status(400);
    next(new Error("No video file found"));
  }
};

exports.deleteFile = async (public_id, deleteType) => {
  if (public_id) {
    // Check if there avatar exist
    try {
      const { result: destroyRes } = await cloudinary.uploader.destroy(
        public_id, {
          resource_type: deleteType,
        }
      );
      console.log("File deleted", destroyRes)
      return destroyRes;
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
};

exports.uploadAllFiles = async (file) => {
  if (file) {
    console.log("FILE", file)
    try {
      return await cloudinary.uploader.upload(file.path, {
        public_id: `${file.filename}_${file.originalname}`.replace(/\s/g,"_"),
        resource_type: "auto",
      });
    } catch (error) {
      res.status(400);
      next(new Error(error));
    }
  } else {
    res.status(400);
    next(new Error("No files found"));
  }
};
