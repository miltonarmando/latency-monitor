const { sendWhatsAppMessage } = require("../services/whatsappService"); // Import the service responsible for sending WhatsApp messages
const logger = require("../services/loggingService"); // Import the logging service
const notifyTo = require("../config/settings"); // Import settings for notification configurations

/**
 * Sends a notification via WhatsApp to a specific chat.
 * 
 * @param {string} message - The message to be sent.
 * @param {string} [chatId=notifyTo.test.testChatId] - (Optional) The unique ID of the WhatsApp chat to which the message will be sent.
 *                                                    Defaults to the test chat ID defined in the settings.
 */
async function notifyViaWhatsApp(message, chatId = notifyTo.test.testChatId) {
  try {
    // Attempt to send the WhatsApp message
    await sendWhatsAppMessage(message, chatId);
    logger.info(`Notification successfully sent via WhatsApp to chat ID: ${chatId}`); // Log success message
  } catch (error) {
    // Log an error message if the notification fails
    logger.error(`Failed to send notification to chat ID ${chatId}: ${error.message}`);
  }
}

// Export the function for use in other modules
module.exports = { notifyViaWhatsApp };
