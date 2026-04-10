const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
  res.send("DPI Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});