const asyncHandler = require("express-async-handler");
const cloudinaryHelper = require("../utility/cloudinaryHelper");

// @desc Upload photo for editor JS
// @route /api/utilities/uploadphoto
// @access Private
exports.editorJSUploadPhoto = asyncHandler(async (req, res, next) => {
  const { file } = req;
  const { mimetype } = file;
  const { secure_url, public_id } = await cloudinaryHelper.uploadPhoto(
    req.file
  );

  res.status(200).json({
    success: 1,
    file: {
      url: secure_url,
      public_id,
      mimetype,
      // any other image data you want to store, such as width, height, color, extension, etc
    },
  });
});

exports.editorJSUploadVideo = asyncHandler(async (req, res, next) => {
  const { file } = req;
  const { mimetype } = file;
  const { secure_url, public_id } = await cloudinaryHelper.uploadVideo(
    req.file
  );

  res.status(200).json({
    success: 1,
    file: {
      url: secure_url,
      public_id,
      mimetype,
    },
  });
});

exports.editorJSDeleteFile = asyncHandler(async (req, res, next) => {
  const { public_id, mimetype } = req.body;
  // console.log("PublicID", public_id);

  const mimetypeArr = mimetype.split("/");

  let deleteType = "image";
  if (mimetypeArr[0] === "video") {
    deleteType = "video";
  }

  if (mimetypeArr[0] === "application") {
    if (mimetypeArr[1] !== "pdf") {
      deleteType = "raw";
    }
  }

  const destroRes = await cloudinaryHelper.deleteFile(public_id, deleteType);
  res.status(200).json({ message: "File deleted from database" });
});

exports.editorJSUploadFile = asyncHandler(async (req, res, next) => {
  const { file } = req;
  const { mimetype } = file;
  const { secure_url, public_id } = await cloudinaryHelper.uploadAllFiles(
    req.file
  );

  res.status(200).json({
    success: 1,
    file: {
      url: secure_url,
      public_id,
      mimetype,
    },
  });
});
