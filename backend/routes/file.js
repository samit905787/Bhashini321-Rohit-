const express = require("express");
const router = express.Router();
const multer = require("multer");
const File = require("../models/file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

//Upload file
router.post(
  "/upload",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "readmeText",
      maxCount: 1,
    },
  ]),
  async function (req, res, next) {
    const {
      organizationName,
      officerName,
      designation,
      emailId,
      contactNumber,
    } = req.body;

    const files = [];

    if (req.files.file) {
      const newFile = new File({
        path: req.files.file[0].path,
        originalname: req.files.file[0].originalname,
        readmeText: req.files.file[0].filename,
        organizationName,
        officerName,
        designation,
        emailId,
        contactNumber,
      });
      const file = await File.addFile(newFile);
      files.push(file);
    }

  

    res.send(files);
  }
);

module.exports = router;
