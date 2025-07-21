#!/bin/bash
# SAM deployment script

# Set variables
STACK_NAME="sam-app-stack"
S3_BUCKET="your-deployment-bucket"
REGION="us-east-1"
ENV="dev"

# Build the SAM application
echo "Building SAM application..."
sam build

# Package the application
echo "Packaging SAM application..."
sam package \
  --output-template-file packaged.yaml \
  --s3-bucket $S3_BUCKET \
  --region $REGION

# Deploy the application
echo "Deploying SAM application..."
sam deploy \
  --template-file packaged.yaml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides Environment=$ENV \
  --region $REGION

echo "Deployment complete!"