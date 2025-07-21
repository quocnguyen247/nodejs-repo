# AWS Services Examples

[![DeepCode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6IllPVVJfR0lUSFVCX1VTRVJOQU1FIiwicmVwbzEiOiJub2RlanMtcmVwbyIsImluY2x1ZGVMaW50IjpmYWxzZSwiYXV0aG9ySWQiOiIyODQzNiIsImlhdCI6MTY1MzA1NjI3OX0.RpE3zUyk7WwpCyRQtO5V5cTyeYQI9IXpcT3PzBPZJJE)](https://www.deepcode.ai)
[![Known Vulnerabilities](https://snyk.io/test/github/YOUR_GITHUB_USERNAME/nodejs-repo/badge.svg)](https://snyk.io/test/github/YOUR_GITHUB_USERNAME/nodejs-repo)

This repository contains examples and configurations for various AWS services.

## CloudFormation

Basic infrastructure template demonstrating:
- Parameters and conditions
- Mappings for region-specific AMIs
- Resource creation with dependencies
- Outputs and exports

## AWS CDK (Cloud Development Kit)

Example CDK application that creates:
- VPC with public and private subnets
- AppConfig application, environment, and configuration profile
- Outputs for resource IDs

## AWS SAM (Serverless Application Model)

Serverless application example with:
- Lambda function with API Gateway integration
- DynamoDB table for data storage
- Environment-specific configuration

## AWS AppConfig

Configuration management examples:
- Feature flags configuration
- JSON schema for validation
- Application settings

## AWS Step Functions

State machine definition for:
- Order processing workflow
- Error handling and retries
- Conditional branching

## AWS Systems Manager (SSM)

Examples for:
- Automation document for EC2 patching with approval
- Run Command document for system health checks
- Parameter Store usage

## Elastic Beanstalk

Node.js application with:
- Environment configuration
- CloudWatch logs integration
- Express.js web application

## Usage

Each directory contains specific examples and configurations for the respective AWS service. Refer to the individual README files in each directory for detailed instructions.

## Security Note

Always follow AWS security best practices:
- Use IAM roles with least privilege
- Store credentials securely using AWS CLI or IAM roles
- Encrypt sensitive data at rest and in transit
- Regularly rotate credentials and review permissions

## Security Scanning

This project uses multiple security scanning tools:

- **Snyk Code Analysis**: Detects security vulnerabilities in code
- **CodeQL**: Advanced semantic code analysis
- **Dependabot**: Monitors dependencies for vulnerabilities

See [SECURITY.md](./SECURITY.md) for details on detected issues and remediation.