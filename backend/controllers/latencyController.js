const { measureLatencyForTwoHosts } = require("../services/pythonService"); // Import the service for measuring latency for two hosts using Python
const { sendWhatsAppMessage } = require("../services/whatsappService"); // Import the WhatsApp message-sending service
const logger = require("../services/loggingService"); // Import the logging service
const { monitor, whatsapp } = require("../config/settings"); // Import monitoring and WhatsApp settings

/**
 * Monitors the network latency and packet loss to the target hosts.
 * Sends a notification via WhatsApp if latency exceeds the threshold or packet loss occurs for either host.
 */
async function monitorLatency() {
  try {
    // Measure latency and packet loss for both target hosts
    const { results } = await measureLatencyForTwoHosts(monitor.targetHost1, monitor.targetHost2);

    // Iterate over the results for both hosts
    for (let i = 0; i < results.length; i++) {
      const host = i === 0 ? monitor.targetHost1 : monitor.targetHost2; // Identify the host
      const { latency, packet_loss } = results[i];

      // Check for packet loss or high latency for the current host
      if (packet_loss || (latency && latency > monitor.latencyThreshold)) {
        const message = packet_loss
          ? `⚠️ High packet loss detected for ${host}!` // Message for packet loss
          : `⚠️ High latency detected for ${host}: ${latency.toFixed(2)}ms`; // Message for high latency
        logger.warn(message); // Log a warning message

        // Send a WhatsApp notification for the current host
        await sendWhatsAppMessage(message, whatsapp.chatId);
      } else {
        // Log a success message if latency is within the acceptable range for the current host
        logger.info(`Latency OK for ${host}: ${latency ? `${latency.toFixed(2)}ms` : "N/A"}`);
      }
    }
  } catch (err) {
    // Log an error message if monitoring fails
    logger.error(`Error during monitoring: ${err.message}`);
  }
}

// Export the monitorLatency function for use in other modules
module.exports = { monitorLatency };
