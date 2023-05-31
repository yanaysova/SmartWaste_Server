const express = require("express");
const router = express.Router();
const trashBinsControllers = require("../Controllers/trashBinsControllers");

router.get("/", trashBinsControllers.getBins);

module.exports = router;
