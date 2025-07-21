const cdk = require('aws-cdk-lib');
const ec2 = require('aws-cdk-lib/aws-ec2');
const iam = require('aws-cdk-lib/aws-iam');
const appconfig = require('aws-cdk-lib/aws-appconfig');

class InfrastructureStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'MainVPC', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        }
      ]
    });

    // Create an AppConfig application
    const application = new appconfig.CfnApplication(this, 'MyAppConfig', {
      name: 'MyApplication',
      description: 'My application configuration'
    });

    // Create an environment
    const environment = new appconfig.CfnEnvironment(this, 'MyEnvironment', {
      applicationId: application.ref,
      name: 'Production',
      description: 'Production environment'
    });

    // Create a configuration profile
    const configProfile = new appconfig.CfnConfigurationProfile(this, 'MyConfigProfile', {
      applicationId: application.ref,
      name: 'ApplicationConfig',
      locationUri: 'hosted',
      validators: [{
        type: 'JSON_SCHEMA',
        content: JSON.stringify({
          type: 'object',
          properties: {
            featureFlags: {
              type: 'object'
            },
            settings: {
              type: 'object'
            }
          }
        })
      }]
    });

    // Output the VPC ID
    new cdk.CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
      description: 'The ID of the VPC',
      exportName: 'MainVpcId'
    });
  }
}

const app = new cdk.App();
new InfrastructureStack(app, 'InfrastructureStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1' 
  }
});

app.synth();