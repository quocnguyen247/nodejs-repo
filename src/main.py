#!/usr/bin/env python3
"""
Sample Python file for AI code review demonstration
"""

def calculate_aws_cost(instance_type, hours, region="us-east-1"):
    """
    Calculate estimated AWS EC2 cost
    
    Args:
        instance_type (str): EC2 instance type
        hours (int): Number of hours
        region (str): AWS region
        
    Returns:
        float: Estimated cost
    """
    # This is a simplified cost calculation
    pricing = {
        "t2.micro": 0.0116,
        "t2.small": 0.023,
        "t2.medium": 0.0464,
        "m5.large": 0.096
    }
    
    if instance_type not in pricing:
        raise ValueError(f"Unknown instance type: {instance_type}")
    
    # Apply regional price adjustment
    region_multiplier = 1.0
    if region == "eu-west-1":
        region_multiplier = 1.1
    elif region == "ap-northeast-1":
        region_multiplier = 1.2
        
    return pricing[instance_type] * hours * region_multiplier

def deploy_cloudformation_stack(stack_name, template_path, parameters=None):
    """
    Deploy a CloudFormation stack
    
    Args:
        stack_name (str): Name of the stack
        template_path (str): Path to the CloudFormation template
        parameters (dict): Optional parameters for the stack
        
    Returns:
        str: Stack ID
    """
    # This would normally use boto3 to deploy a CloudFormation stack
    # For demonstration purposes only
    if parameters is None:
        parameters = {}
    
    print(f"Deploying stack {stack_name} with template {template_path}")
    for key, value in parameters.items():
        print(f"  {key}: {value}")
    
    return f"arn:aws:cloudformation:us-east-1:123456789012:stack/{stack_name}/abcdef-1234-5678-9012-abcdef123456"

if __name__ == "__main__":
    # Example usage
    cost = calculate_aws_cost("t2.medium", 730)  # ~1 month
    print(f"Estimated monthly cost: ${cost:.2f}")
    
    stack_id = deploy_cloudformation_stack(
        "my-web-app",
        "templates/web-app.yaml",
        {
            "EnvironmentType": "dev",
            "InstanceType": "t2.micro"
        }
    )
    print(f"Stack deployed with ID: {stack_id}")