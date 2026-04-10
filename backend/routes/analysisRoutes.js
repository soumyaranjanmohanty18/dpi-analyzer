const express = require("express");
const router = express.Router();

const {
  analyzeTraffic,
  getHistory
} = require("../controllers/analysisController");

router.post("/analyze", analyzeTraffic);
router.get("/history", getHistory);

module.exports = router;