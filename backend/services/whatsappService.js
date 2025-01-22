const settings = require("../config/settings"); // Import configuration settings
const { Client, LocalAuth } = require("whatsapp-web.js"); // Import WhatsApp Web.js client and local authentication
const qrcode = require("qrcode-terminal"); // Import QR code terminal library
const logger = require("./loggingService"); // Import logging service

let isWhatsAppReady = false; // Flag to track WhatsApp connection status
const client = new Client({
  authStrategy: new LocalAuth({ clientId: settings.whatsapp.clientId }), // Use LocalAuth for persistent authentication
});

// Event: QR code generated
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true }); // Generate QR code in terminal
  logger.info("QR Code generated. Scan it to connect to WhatsApp.");
});

// Event: Client is ready
client.on("ready", () => {
  logger.info("Connected to WhatsApp successfully.");
  isWhatsAppReady = true;
});

// Event: Disconnected from WhatsApp
client.on("disconnected", (reason) => {
  logger.warn(`Disconnected from WhatsApp: ${reason}. Reconnecting...`);
  isWhatsAppReady = false; // Reset connection flag
  client.initialize(); // Reinitialize the client
});

// Initialize the WhatsApp client
client.initialize();

/**
 * Wait until the WhatsApp client is authenticated and ready.
 */
async function waitForAuthentication() {
  while (!isWhatsAppReady) {
    logger.info("Waiting for WhatsApp authentication...");
    await new Promise((resolve) => setTimeout(resolve, settings.monitor.interval));
  }
  logger.info("Authentication completed.");
}

/**
 * Send a message via WhatsApp to the specified chat ID.
 * 
 * @param {string} message - The message to send.
 * @param {string} chatId - The WhatsApp chat ID (defaults to the ID in settings).
 */
async function sendWhatsAppMessage(message, chatId = settings.whatsapp.chatId) {
  if (!isWhatsAppReady) {
    logger.error("WhatsApp is not connected.");
    throw new Error("WhatsApp is not connected.");
  }

  try {
    const chat = await client.getChatById(chatId); // Retrieve the chat by ID
    if (!chat) {
      logger.error("Chat not found.");
      throw new Error("Chat not found.");
    }

    await client.sendMessage(chatId, message); // Send the message
    logger.info(`Message sent to ${chatId}: ${message}`);
  } catch (err) {
    logger.error(`Error sending message to ${chatId}: ${err.message}`);
    throw err;
  }
}

// Export the authentication and message-sending functions
module.exports = { waitForAuthentication, sendWhatsAppMessage };