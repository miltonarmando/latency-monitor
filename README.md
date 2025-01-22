
# Latency Monitor 📡

A robust and professional latency monitoring application designed to detect and report high latency or packet loss in network connections. This project leverages a Python-based latency measurement tool, WhatsApp Web for notifications, and a structured Node.js backend for seamless operations.

---

## 📋 Features
- **Latency Monitoring**: Measure latency and packet loss for a specific target host.
- **Threshold-Based Alerts**: Notify users via WhatsApp if latency exceeds predefined thresholds or if packet loss is detected.
- **Extensible Design**: Modular structure for easy addition of new features.
- **Logging**: Comprehensive logging using Winston for better observability.

---

## 🛠️ Technologies Used
- **Node.js**: Backend server and service orchestration.
- **Python**: Script for precise latency measurement.
- **WhatsApp Web.js**: Integration with WhatsApp for real-time notifications.
- **dotenv**: For secure environment variable management.
- **Winston**: Logging library for detailed logs.

---

## 🚀 Getting Started

### Prerequisites
1. **Node.js**: Install the latest LTS version from [Node.js](https://nodejs.org/).
2. **Python**: Ensure Python 3.x is installed for the latency script.
3. **WhatsApp Account**: Required for sending notifications.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/marmando/latency-monitor.git
   cd latency-monitor/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `root` directory of project:
     ```plaintext
     MONITOR_INTERVAL=60000
     TARGET_HOST=example.com
     LATENCY_THRESHOLD=200
     WHATSAPP_CHAT_ID=1234567890@c.us
     CLIENT_ID=my-client-id
     LOGGING_LEVEL=info
     LOG_FILE_PATH=./logs/app.log
     TEST_WHATSAPP_CHAT_ID=0987654321@c.us
     ```
4. Start the application:
   ```bash
   cd ./backend
   node app.js
   ```

---

## 🧪 Testing
To test the application:
1. Run the latency monitoring function:
   ```bash
   node ./controllers/latencyController.js
   ```
2. Verify logs and WhatsApp messages for latency and packet loss alerts.

---

## 📄 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📝 Acknowledgements
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) for enabling WhatsApp integration.
- [Winston](https://github.com/winstonjs/winston) for robust logging.
- Python for its seamless integration with latency measurement.

---

## 🙋‍♂️ Support
For issues or feature requests, open an issue on [GitHub](https://github.com/yourusername/latency-monitor/issues).
