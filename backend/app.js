const { monitorLatency } = require("./controllers/latencyController"); // Import latency monitoring function
const { monitor, test } = require("./config/settings"); // Import settings, such as monitoring interval and chat ID for test
const { waitForAuthentication, sendWhatsAppMessage } = require("./services/whatsappService"); // Import WhatsApp services

(async () => {
  try {
    // Wait for WhatsApp authentication to be completed
    await waitForAuthentication();

    // Example: Send a test message to WhatsApp
    await sendWhatsAppMessage("Hello, this is a test!", test.testChatId);

    // Start monitoring latency at the defined intervals
    setInterval(async () => {
      await monitorLatency(); // Call the latency monitoring function
    }, monitor.interval); // Use the interval set in the config
  } catch (err) {
    // Handle fatal application errors
    console.error("Fatal application error:", err.message);
    process.exit(1); // Exit the application on error
  }
})();