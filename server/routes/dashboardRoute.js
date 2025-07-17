const express = require("express");
const { getStats } = require("../controllers/dashBoardCtrl");
const router = express.Router();


router.get("/getAll", getStats);


module.exports = router;
