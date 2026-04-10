const { spawn } = require("child_process");
const path = require("path");

const runDPI = () => {
  return new Promise((resolve, reject) => {

    const exePath = path.join(__dirname, "../../cpp-engine/dpi_simple.exe");
    const inputPath = path.join(__dirname, "../../cpp-engine/test_dpi.pcap");
    const outputPath = path.join(__dirname, "../../cpp-engine/output.pcap");

    // 🔥 Use spawn instead of exec
    const dpiProcess = spawn(exePath, [inputPath, outputPath]);

    let stdoutData = "";
    let stderrData = "";

    // Capture stdout
    dpiProcess.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    // Capture stderr
    dpiProcess.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    // When process ends
    dpiProcess.on("close", (code) => {

      console.log("========== DPI DEBUG ==========");
      console.log("STDOUT:\n", stdoutData);
      console.log("STDERR:\n", stderrData);
      console.log("================================");

      const combinedOutput = (stdoutData + stderrData).trim();

      const jsonStart = combinedOutput.indexOf("{");
      const jsonEnd = combinedOutput.lastIndexOf("}") + 1;

      if (jsonStart === -1 || jsonEnd === -1) {
        return reject("JSON not found in output");
      }

      try {
        const jsonString = combinedOutput.slice(jsonStart, jsonEnd);
        const result = JSON.parse(jsonString);
        resolve(result);
      } catch (err) {
        console.error("PARSE ERROR:", err);
        reject("Invalid JSON from DPI engine");
      }
    });

    // Handle process errors
    dpiProcess.on("error", (err) => {
      reject(err);
    });

  });
};

module.exports = { runDPI };