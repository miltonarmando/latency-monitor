require("dotenv").config({ path: "../.env" }); // Load environment variables from the .env file located in the parent directory

// Export application settings as a module
module.exports = {
  monitor: {
    interval: process.env.MONITOR_INTERVAL, // Interval (in milliseconds) for monitoring latency
    targetHost1: process.env.TARGET_HOST1, // Target host to monitor (e.g., an IP address or domain)
    targetHost2: process.env.TARGET_HOST2, // Target host to monitor (e.g., an IP address or domain)
    latencyThreshold: process.env.LATENCY_THRESHOLD, // Threshold for latency (in milliseconds) to trigger alerts
  },
  whatsapp: {
    chatId: process.env.WHATSAPP_CHAT_ID, // Default WhatsApp chat ID for sending notifications
    clientId: process.env.CLIENT_ID, // Client ID for WhatsApp authentication
  },
  logging: {
    level: process.env.LOGGING_LEVEL, // Logging level (e.g., "info", "warn", "error")
    filePath: process.env.LOG_FILE_PATH, // File path for logging outputs
  },
  test: {
    testChatId: process.env.TEST_WHATSAPP_CHAT_ID, // Chat ID for testing WhatsApp notifications
  },
};
