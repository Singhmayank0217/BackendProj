const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload, videoUpload, imageSizeReducer } = require("../Controllers/fileUpload");
// const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require("../Controllers/fileUpload");


router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);
router.post("/localFileupload", localFileUpload);

module.exports = router;  