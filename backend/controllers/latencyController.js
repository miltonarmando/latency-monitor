const { measureLatency } = require("../services/pythonService"); // Import the service for measuring latency using Python
const { sendWhatsAppMessage } = require("../services/whatsappService"); // Import the WhatsApp message-sending service
const logger = require("../services/loggingService"); // Import the logging service
const { monitor, whatsapp } = require("../config/settings"); // Import monitoring and WhatsApp settings

/**
 * Monitors the network latency and packet loss to the target host.
 * Sends a notification via WhatsApp if latency exceeds the threshold or packet loss occurs.
 */
async function monitorLatency() {
  try {
    // Measure the latency and packet loss for the target host
    const { latency, packet_loss } = await measureLatency(monitor.targetHost);

    // Check for packet loss or high latency
    if (packet_loss || (latency && latency > monitor.latencyThreshold)) {
      const message = packet_loss
        ? "⚠️ High packet loss detected!" // Message for packet loss
        : `⚠️ High latency: ${latency.toFixed(2)}ms`; // Message for high latency
      logger.warn(message); // Log a warning message

      // Send a WhatsApp notification and wait for it to complete
      await sendWhatsAppMessage(message, whatsapp.chatId);
    } else {
      // Log a success message if latency is within the acceptable range
      logger.info(`Latency OK: ${latency ? `${latency.toFixed(2)}ms` : "N/A"}`);
    }
  } catch (err) {
    // Log an error message if monitoring fails
    logger.error(`Error during monitoring: ${err.message}`);
  }
}

// Export the monitorLatency function for use in other modules
module.exports = { monitorLatency };
