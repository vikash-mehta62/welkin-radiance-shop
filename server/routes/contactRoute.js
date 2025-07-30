const express = require("express");
const { contactUsController } = require("../controllers/contact");
const router = express.Router();


router.post("/create", contactUsController);


module.exports = router;