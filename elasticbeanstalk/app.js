const express = require('express');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

// Initialize Express app
const app = express();
const port = process.env.APP_PORT || 8080;

// Configure logging
const logDir = '/var/log/nodejs';
const logFile = path.join(logDir, 'application.log');

// Create log directory if it doesn't exist (for local development)
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
} catch (err) {
  console.error('Error creating log directory:', err);
}

// Simple logging function
function log(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}\n`;
  
  console.log(logMessage.trim());
  
  try {
    fs.appendFileSync(logFile, logMessage);
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
}

// Middleware for request logging
app.use((req, res, next) => {
  log('info', `${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  log('info', 'Health check requested');
  res.status(200).json({ status: 'healthy' });
});

// Main endpoint
app.get('/', (req, res) => {
  log('info', 'Root endpoint requested');
  res.send(`
    <html>
      <head>
        <title>AWS Elastic Beanstalk Node.js App</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          .container { max-width: 800px; margin: 0 auto; }
          .info { background-color: #f4f4f4; padding: 20px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>AWS Elastic Beanstalk Node.js Application</h1>
          <div class="info">
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p><strong>Instance ID:</strong> ${process.env.HOSTNAME || 'local'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  log('info', `Server running on port ${port}`);
});