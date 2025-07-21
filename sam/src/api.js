const AWS = require('aws-sdk');

// Initialize AppConfig client
const appConfig = new AWS.AppConfig();

// Cache for configuration to reduce API calls
let configCache = {
  data: null,
  timestamp: 0,
  ttl: 60 * 1000 // 1 minute TTL
};

/**
 * Get configuration from AppConfig
 */
async function getConfiguration() {
  const now = Date.now();
  
  // Return cached config if still valid
  if (configCache.data && now - configCache.timestamp < configCache.ttl) {
    return configCache.data;
  }
  
  // Fetch fresh configuration
  try {
    const params = {
      Application: process.env.APPCONFIG_APPLICATION || 'MyApplication',
      Environment: process.env.APPCONFIG_ENVIRONMENT || process.env.ENVIRONMENT || 'dev',
      Configuration: process.env.APPCONFIG_CONFIGURATION || 'ApplicationConfig',
      ClientId: 'sam-api-function'
    };
    
    const response = await appConfig.getConfiguration(params).promise();
    const config = JSON.parse(response.Content.toString());
    
    // Update cache
    configCache = {
      data: config,
      timestamp: now,
      ttl: 60 * 1000
    };
    
    return config;
  } catch (error) {
    console.error('Error fetching configuration:', error);
    // Return default config in case of error
    return {
      features: {
        newFeature: false
      },
      settings: {
        timeout: 5000
      }
    };
  }
}

/**
 * Lambda handler function
 */
exports.handler = async (event, context) => {
  try {
    // Get configuration
    const config = await getConfiguration();
    
    // Process request based on configuration
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'API request successful',
        environment: process.env.ENVIRONMENT || 'dev',
        configuration: config,
        timestamp: new Date().toISOString()
      })
    };
    
    return response;
  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};