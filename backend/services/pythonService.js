const { spawn } = require("child_process"); // Import child_process for spawning subprocesses
const logger = require("./loggingService"); // Import logging service

/**
 * Measure latency by invoking a Python script.
 * 
 * @param {string} targetHost - The host for which to measure latency.
 * @returns {Promise<Object>} - A promise that resolves with the result of the latency measurement.
 */
async function measureLatency(targetHost) {
  return new Promise((resolve, reject) => {
    // Spawn a Python process to execute the latency measurement script
    const process = spawn("python3", ["../scripts/measure_latency.py", targetHost]);

    let data = ""; // Accumulator for stdout data

    // Handle data from stdout
    process.stdout.on("data", (chunk) => (data += chunk.toString()));

    // Handle errors from stderr
    process.stderr.on("data", (err) => {
      logger.error(`Error in Python script: ${err}`);
      reject(err); // Reject promise with the error
    });

    // Handle process close event
    process.on("close", () => {
      try {
        // Parse the result from the Python script's output
        const result = JSON.parse(data.trim());
        resolve(result); // Resolve promise with the parsed result
      } catch (err) {
        logger.error(`Error parsing Python script output: ${err}`);
        reject(err); // Reject promise if parsing fails
      }
    });
  });
}

// Export the measureLatency function for use in other modules
module.exports = { measureLatency };