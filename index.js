const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = process.env.PORT || 3000;

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' });

app.use(express.json());

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'healthy' });
});

// AppConfig example endpoint
app.get('/config', async (req, res) => {
  try {
    const appConfig = new AWS.AppConfig();
    const params = {
      Application: process.env.APPCONFIG_APPLICATION || 'MyApplication',
      Environment: process.env.APPCONFIG_ENVIRONMENT || 'Production',
      Configuration: process.env.APPCONFIG_CONFIGURATION || 'ApplicationConfig',
      ClientId: 'aws-service-demo'
    };
    
    const configData = await appConfig.getConfiguration(params).promise();
    const config = JSON.parse(configData.Content.toString());
    
    res.status(200).send(config);
  } catch (error) {
    console.error('Error fetching configuration:', error);
    res.status(500).send({ error: 'Failed to fetch configuration' });
  }
});

// CloudFormation stack status endpoint
app.get('/stacks/:stackName', async (req, res) => {
  try {
    const cloudformation = new AWS.CloudFormation();
    const params = {
      StackName: req.params.stackName
    };
    
    const stackData = await cloudformation.describeStacks(params).promise();
    res.status(200).send(stackData.Stacks[0]);
  } catch (error) {
    console.error('Error fetching stack:', error);
    res.status(500).send({ error: 'Failed to fetch stack information' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});