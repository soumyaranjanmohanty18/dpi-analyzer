const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  totalPackets: Number,
  forwarded: Number,
  dropped: Number,
  activeFlows: Number,
  applications: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", analysisSchema);