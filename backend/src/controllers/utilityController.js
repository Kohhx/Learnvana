const asyncHandler = require("express-async-handler");
const cloudinaryHelper = require("../utility/cloudinaryHelper");

// @desc Upload photo for editor JS
// @route /api/utilities/uploadphoto
// @access Private
exports.editorJSUploadPhoto = asyncHandler(async (req, res, next) => {

  const { secure_url, public_id } = await cloudinaryHelper.uploadPhoto(
    req.file
  );

  res.status(200).json({
    success: 1,
    file: {
      url: secure_url,
      public_id,
      // any other image data you want to store, such as width, height, color, extension, etc
    },
  });
});

exports.editorJSDeletePhoto = asyncHandler(async (req, res, next) => {
  const { public_id }= req.body;
  // console.log(public_id)
  const destroRes = await cloudinaryHelper.deletePhoto(public_id);
  res.status(200).json({ message: "Photo delete from database" });
});
