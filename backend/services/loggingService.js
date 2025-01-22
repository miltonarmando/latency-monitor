const { createLogger, format, transports } = require("winston"); // Import Winston logging library
const { logging } = require("../config/settings"); // Import logging configuration from settings

/**
 * Create a logger instance using Winston.
 * Configures the logger to log messages to both the console and a file.
 */
const logger = createLogger({
  level: logging.level, // Set the logging level (e.g., 'info', 'error', etc.) from configuration
  format: format.combine(
    format.timestamp(), // Add a timestamp to each log message
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    ) // Customize the log message format
  ),
  transports: [
    new transports.Console(), // Log messages to the console
    new transports.File({ filename: logging.filePath }), // Log messages to a file defined in the configuration
  ],
});

// Export the logger instance for use in other modules
module.exports = logger;