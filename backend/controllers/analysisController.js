const Analysis = require("../models/Analysis");
const { runDPI } = require("../services/dpiService");

const analyzeTraffic = async (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: "filePath required" });
    }

    const result = await runDPI(filePath);

    const saved = await Analysis.create(result);

    res.json(saved);

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getHistory = async (req, res) => {
  const data = await Analysis.find().sort({ createdAt: -1 });
  res.json(data);
};

module.exports = { analyzeTraffic, getHistory };