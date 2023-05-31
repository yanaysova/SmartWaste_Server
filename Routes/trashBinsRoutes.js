const express = require("express");
const router = express.Router();
const trashBinsControllers = require("../Controllers/trashBinsControllers");
const upload = require("../utils/fileUpload");

router.post("/upload", upload.single("picture"), trashBinsControllers.getBins);

module.exports = router;
