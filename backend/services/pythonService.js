const { spawn } = require("child_process"); // Import child_process for spawning subprocesses
const logger = require("./loggingService"); // Import logging service

/**
 * Measure latency for a given host by invoking a Python script.
 * 
 * @param {string} host - The host for which to measure latency.
 * @returns {Promise<Object>} - A promise that resolves with the result of the latency measurement.
 */
async function measureLatency(host) {
  return new Promise((resolve, reject) => {
    // Spawn a Python process to execute the latency measurement script
    const process = spawn("python3", ["../scripts/measure_latency.py", host]);

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

/**
 * Measure latency for two hosts and return their results.
 * 
 * @param {string} host1 - The first host to measure latency for.
 * @param {string} host2 - The second host to measure latency for.
 * @returns {Promise<Object>} - A promise that resolves with combined results for both hosts.
 */
async function measureLatencyForTwoHosts(host1, host2) {
  try {
    // Measure latency for both hosts concurrently
    const [result1, result2] = await Promise.all([measureLatency(host1), measureLatency(host2)]);
    return {
      results: [result1, result2]
    };
  } catch (err) {
    logger.error(`Error measuring latency for hosts: ${err}`);
    throw err; // Propagate error to the caller
  }
}

// Export the measureLatency and measureLatencyForTwoHosts functions
module.exports = { measureLatency, measureLatencyForTwoHosts };
