CI/CD with Terraform

This repository contains a comprehensive CI/CD (Continuous Integration/Continuous Deployment) pipeline implemented with Terraform and Docker. The pipeline facilitates the automated deployment of infrastructure and applications, enabling efficient and consistent workflows. By leveraging this pipeline, you can achieve streamlined infrastructure provisioning, container image management, and application deployment processes.

The CI/CD pipeline is triggered on a push event to the main branch of the repository. It encompasses two main jobs: "deploy-infra" and "deploy-app." The "deploy-infra" job is responsible for deploying the infrastructure using Terraform, while the "deploy-app" job handles the deployment of applications using Docker.

During the "deploy-infra" job, the pipeline utilizes Terraform to provision and manage the infrastructure. It initializes Terraform with the specified backend configuration and generates an execution plan to destroy the existing infrastructure. Upon approval, the pipeline applies the plan to destroy the infrastructure. The public IP address of the deployed server is extracted and made available as an output variable.

The "deploy-app" job relies on the successful completion of the "deploy-infra" job. It starts by logging into the AWS Elastic Container Registry (ECR) and proceeds to build a Docker image of the application. The image is then pushed to the specified ECR repository. Finally, the pipeline utilizes SSH to deploy the Docker image onto an EC2 instance. This ensures that the latest version of the application is deployed and accessible.

To support the pipeline's operations, various environment variables are defined, such as AWS credentials, Terraform state bucket name, SSH key pairs, and the AWS region for deployment.

By incorporating this CI/CD pipeline into your development workflow, you can benefit from automated infrastructure provisioning, streamlined application deployment, and improved overall efficiency. This pipeline reduces the need for manual intervention, enhances consistency, and enables rapid iteration of both infrastructure and application changes.

Please refer to the documentation and instructions provided in the repository to effectively utilize and customize this CI/CD pipeline for your specific projects and requirements.
