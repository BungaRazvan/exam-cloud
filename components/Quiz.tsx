"use client";

import { useState } from "react";
import Question from "./Question";
import { isEqual, sortBy } from "lodash";

export default function Quiz() {
  const [questions, setQuestions] = useState([
    {
      text: "Which of the below options are related to the reliability of AWS? (Choose TWO)",
      options: [
        {
          value: "A",
          label:
            "Applying the principle of least privilege to all AWS resources.",
        },
        {
          value: "B",
          label: "Automatically provisioning new resources to meet demand.",
        },
        {
          value: "C",
          label:
            "All AWS services are considered Global Services, and this design helps customers serve their international users.",
        },
        {
          value: "D",
          label: "Providing compensation to customers if issues occur.",
        },
        {
          value: "E",
          label: "Ability to recover quickly from failures.",
        },
      ],
      correctAnswers: ["B", "E"],
      exam: "1",
    },
    {
      text: "Which statement is true regarding the AWS Shared Responsibility Model?",
      options: [
        {
          value: "A",
          label: "Responsibilities vary depending on the services used.",
        },
        {
          value: "B",
          label: "Security of the IaaS services is the responsibility of AWS.",
        },
        {
          value: "C",
          label: "Patching the guest OS is always the responsibility of AWS.",
        },
        {
          value: "D",
          label:
            "Security of the managed services is the responsibility of the customer.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "You have set up consolidated billing for several AWS accounts. One of the accounts has purchased a number of reserved instances for 3 years. Which of the following is true regarding this scenario?",
      options: [
        {
          value: "A",
          label:
            "The Reserved Instance discounts can only be shared with the master account.",
        },
        {
          value: "B",
          label:
            "All accounts can receive the hourly cost benefit of the Reserved Instances.",
        },
        {
          value: "C",
          label:
            "The purchased instances will have better performance than On-demand instances.",
        },
        {
          value: "D",
          label:
            "There are no cost benefits from using consolidated billing; It is for informational purposes only.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "A company has developed an eCommerce web application in AWS. What should they do to ensure that the application has the highest level of availability?",
      options: [
        {
          value: "A",
          label:
            "Deploy the application across multiple Availability Zones and Edge locations.",
        },
        {
          value: "B",
          label:
            "Deploy the application across multiple Availability Zones and subnets.",
        },
        {
          value: "C",
          label:
            "Deploy the application across multiple Regions and Availability Zones.",
        },
        {
          value: "D",
          label:
            "Deploy the application across multiple VPC\u2019s and subnets.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "What does AWS Snowball provide? (Choose TWO)",
      options: [
        {
          value: "A",
          label:
            "Built-in computing capabilities that allow customers to process data locally.",
        },
        {
          value: "B",
          label:
            "A catalog of third-party software solutions that customers need to build solutions and run their businesses.",
        },
        {
          value: "C",
          label:
            "A hybrid cloud storage between on-premises environments and the AWS Cloud.",
        },
        {
          value: "D",
          label:
            "An Exabyte-scale data transfer service that allows you to move extremely large amounts of data to AWS.",
        },
        {
          value: "E",
          label:
            "Secure transfer of large amounts of data into and out of the AWS.",
        },
      ],
      correctAnswers: ["A", "E"],
      exam: "1",
    },
    {
      text: "A company has an AWS Enterprise Support plan. They want quick and efficient guidance with their billing and account inquiries. Which of the following should the company use?",
      options: [
        {
          value: "A",
          label: "AWS Health Dashboard.",
        },
        {
          value: "B",
          label: "AWS Support Concierge.",
        },
        {
          value: "C",
          label: "AWS Customer Service.",
        },
        {
          value: "D",
          label: "AWS Operations Support.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "A Japanese company hosts their applications on Amazon EC2 instances in the Tokyo Region. The company has opened new branches in the United States, and the US users are complaining of high latency. What can the company do to reduce latency for the users in the US while minimizing costs?",
      options: [
        {
          value: "A",
          label: "Applying the Amazon Connect latency-based routing policy.",
        },
        {
          value: "B",
          label:
            "Registering a new US domain name to serve the users in the US.",
        },
        {
          value: "C",
          label:
            "Building a new data center in the US and implementing a hybrid model.",
        },
        {
          value: "D",
          label:
            "Deploying new Amazon EC2 instances in a Region located in the US.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "An organization has a large number of technical employees who operate their AWS Cloud infrastructure. What does AWS provide to help organize them into teams and then assign the appropriate permissions for each team?",
      options: [
        {
          value: "A",
          label: "IAM roles.",
        },
        {
          value: "B",
          label: "IAM users.",
        },
        {
          value: "C",
          label: "IAM user groups.",
        },
        {
          value: "D",
          label: "AWS Organizations.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "A company has decided to migrate its Oracle database to AWS. Which AWS service can help achieve this without negatively impacting the functionality of the source database?",
      options: [
        {
          value: "A",
          label: "AWS OpsWorks.",
        },
        {
          value: "B",
          label: "AWS Database Migration Service.",
        },
        {
          value: "C",
          label: "AWS Server Migration Service.",
        },
        {
          value: "D",
          label: "AWS Application Discovery Service.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "Adjusting compute capacity dynamically to reduce cost is an implementation of which AWS cloud best practice?",
      options: [
        {
          value: "A",
          label: "Build security in every layer.",
        },
        {
          value: "B",
          label: "Parallelize tasks.",
        },
        {
          value: "C",
          label: "Implement elasticity.",
        },
        {
          value: "D",
          label: "Adopt monolithic architecture.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "What are the benefits of having infrastructure hosted in AWS? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "Increasing speed and agility.",
        },
        {
          value: "B",
          label: "There is no need to worry about security.",
        },
        {
          value: "C",
          label: "Gaining complete control over the physical infrastructure.",
        },
        {
          value: "D",
          label: "Operating applications on behalf of customers.",
        },
        {
          value: "E",
          label:
            "All of the physical security and most of the data/network security are taken care of for you.",
        },
      ],
      correctAnswers: ["A", "E"],
      exam: "1",
    },
    {
      text: 'What is the advantage of the AWS-recommended practice of "decoupling" applications?',
      options: [
        {
          value: "A",
          label: "Allows treating an application as a single, cohesive unit.",
        },
        {
          value: "B",
          label:
            "Reduces inter-dependencies so that failures do not impact other components of the application.",
        },
        {
          value: "C",
          label:
            "Allows updates of any monolithic application quickly and easily.",
        },
        {
          value: "D",
          label: "Allows tracking of any API call made to any AWS service.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "Which of the following helps a customer view the Amazon EC2 billing activity for the past month?",
      options: [
        {
          value: "A",
          label: "AWS Budgets.",
        },
        {
          value: "B",
          label: "AWS Pricing Calculator.",
        },
        {
          value: "C",
          label: "AWS Systems Manager.",
        },
        {
          value: "D",
          label: "AWS Cost & Usage Reports.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "What do you gain from setting up consolidated billing for five different AWS accounts under another master account?",
      options: [
        {
          value: "A",
          label:
            "AWS services\u2019 costs will be reduced to half the original price.",
        },
        {
          value: "B",
          label:
            "The consolidated billing feature is just for organizational purpose.",
        },
        {
          value: "C",
          label: "Each AWS account gets volume discounts.",
        },
        {
          value: "D",
          label:
            "Each AWS account gets five times the free-tier services capacity.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "What should you do in order to keep the data on EBS volumes safe? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "Regularly update firmware on EBS devices.",
        },
        {
          value: "B",
          label: "Create EBS snapshots.",
        },
        {
          value: "C",
          label: "Ensure that EBS data is encrypted at rest.",
        },
        {
          value: "D",
          label: "Store a backup daily in an external drive.",
        },
        {
          value: "E",
          label: "Prevent any unauthorized access to AWS data centers.",
        },
      ],
      correctAnswers: ["B", "C"],
      exam: "1",
    },
    {
      text: "One of the most important AWS best-practices to follow is the cloud architecture principle of elasticity. How does this principle improve your architecture\u2019s design?",
      options: [
        {
          value: "A",
          label:
            "By automatically scaling your on-premises resources based on changes in demand.",
        },
        {
          value: "B",
          label:
            "By automatically scaling your AWS resources using an Elastic Load Balancer.",
        },
        {
          value: "C",
          label:
            "By reducing interdependencies between application components wherever possible.",
        },
        {
          value: "D",
          label:
            "By automatically provisioning the required AWS resources based on changes in demand.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "A startup company is operating on limited funds and is extremely concerned about cost overruns. Which of the below options can be used to notify the company when their monthly AWS bill exceeds $2000? (Choose TWO)",
      options: [
        {
          value: "A",
          label:
            "Setup a CloudWatch billing alarm that triggers an SNS notification when the threshold is exceeded.",
        },
        {
          value: "B",
          label:
            "Configure the Amazon Simple Email Service to send billing alerts to their email address on a daily basis.",
        },
        {
          value: "C",
          label:
            "Configure the AWS Budgets Service to alert the company when the threshold is exceeded.",
        },
        {
          value: "D",
          label:
            "Configure AWS CloudTrail to automatically delete all AWS resources when the threshold is exceeded.",
        },
        {
          value: "E",
          label:
            "Configure the Amazon Connect Service to alert the company when the threshold is exceeded.",
        },
      ],
      correctAnswers: ["A", "C"],
      exam: "1",
    },
    {
      text: "What does Amazon CloudFront use to distribute content to global users with low latency?",
      options: [
        {
          value: "A",
          label: "AWS Global Accelerator.",
        },
        {
          value: "B",
          label: "AWS Regions.",
        },
        {
          value: "C",
          label: "AWS Edge Locations.",
        },
        {
          value: "D",
          label: "AWS Availability Zones.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: 'What does the "Principle of Least Privilege" refer to?',
      options: [
        {
          value: "A",
          label:
            "You should grant your users only the permissions they need when they need them and nothing more.",
        },
        {
          value: "B",
          label:
            "All IAM users should have at least the necessary permissions to access the core AWS services.",
        },
        {
          value: "C",
          label:
            "All trusted IAM users should have access to any AWS service in the respective AWS account.",
        },
        {
          value: "D",
          label:
            "IAM users should not be granted any permissions; to keep your account safe.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "Which of the following does NOT belong to the AWS Cloud Computing models?",
      options: [
        {
          value: "A",
          label: "Platform as a Service (PaaS).",
        },
        {
          value: "B",
          label: "Infrastructure as a Service (IaaS).",
        },
        {
          value: "C",
          label: "Software as a Service (SaaS).",
        },
        {
          value: "D",
          label: "Networking as a Service (NaaS).",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "The identification process of an online financial services company requires that new users must complete an online interview with their security team. The completed recorded interviews are only required in the event of a legal issue or a regulatory compliance breach. What is the most cost-effective service to store the recorded videos?",
      options: [
        {
          value: "A",
          label: "S3 Intelligent-Tiering.",
        },
        {
          value: "B",
          label: "AWS Marketplace.",
        },
        {
          value: "C",
          label: "Amazon S3 Glacier Deep Archive.",
        },
        {
          value: "D",
          label: "Amazon EBS.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "Which service provides DNS in the AWS cloud?",
      options: [
        {
          value: "A",
          label: "Route 53.",
        },
        {
          value: "B",
          label: "AWS Config.",
        },
        {
          value: "C",
          label: "Amazon CloudFront.",
        },
        {
          value: "D",
          label: "Amazon EMR.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "Hundreds of thousands of DDoS attacks are recorded every month worldwide. What service does AWS provide to help protect AWS Customers from these attacks? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "AWS Shield.",
        },
        {
          value: "B",
          label: "AWS Config.",
        },
        {
          value: "C",
          label: "Amazon Cognito.",
        },
        {
          value: "D",
          label: "AWS WAF.",
        },
        {
          value: "E",
          label: "AWS KMS.",
        },
      ],
      correctAnswers: ["A", "D"],
      exam: "1",
    },
    {
      text: "A company is deploying a new two-tier web application in AWS. Where should the most frequently accessed data be stored so that the application\u2019s response time is optimal?",
      options: [
        {
          value: "A",
          label: "AWS OpsWorks.",
        },
        {
          value: "B",
          label: "AWS Storage Gateway.",
        },
        {
          value: "C",
          label: "Amazon EBS volume.",
        },
        {
          value: "D",
          label: "Amazon ElastiCache.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "You want to run a questionnaire application for only one day (without interruption), which Amazon EC2 purchase option should you use?",
      options: [
        {
          value: "A",
          label: "Reserved instances.",
        },
        {
          value: "B",
          label: "Spot instances.",
        },
        {
          value: "C",
          label: "Dedicated instances.",
        },
        {
          value: "D",
          label: "On-demand instances.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "You are working on a project that involves creating thumbnails of millions of images. Consistent uptime is not an issue, and continuous processing is not required. Which EC2 buying option would be the most cost-effective?",
      options: [
        {
          value: "A",
          label: "Reserved Instances.",
        },
        {
          value: "B",
          label: "On-demand Instances.",
        },
        {
          value: "C",
          label: "Dedicated Instances.",
        },
        {
          value: "D",
          label: "Spot Instances.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "Which of the following can be described as a global content delivery network (CDN) service?",
      options: [
        {
          value: "A",
          label: "AWS VPN.",
        },
        {
          value: "B",
          label: "AWS Direct Connect.",
        },
        {
          value: "C",
          label: "AWS Regions.",
        },
        {
          value: "D",
          label: "Amazon CloudFront.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "Which of the following services allows customers to manage their agreements with AWS?",
      options: [
        {
          value: "A",
          label: "AWS Artifact.",
        },
        {
          value: "B",
          label: "AWS Certificate Manager.",
        },
        {
          value: "C",
          label: "AWS Systems Manager.",
        },
        {
          value: "D",
          label: "AWS Organizations.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "Which of the following are examples of AWS-Managed Services, where AWS is responsible for the operational and maintenance burdens of running the service? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "Amazon VPC.",
        },
        {
          value: "B",
          label: "Amazon DynamoDB.",
        },
        {
          value: "C",
          label: "Amazon Elastic MapReduce.",
        },
        {
          value: "D",
          label: "AWS IAM.",
        },
        {
          value: "E",
          label: "Amazon Elastic Compute Cloud.",
        },
      ],
      correctAnswers: ["B", "C"],
      exam: "1",
    },
    {
      text: "Your company has a data store application that requires access to a NoSQL database. Which AWS database offering would meet this requirement?",
      options: [
        {
          value: "A",
          label: "Amazon Aurora.",
        },
        {
          value: "B",
          label: "Amazon DynamoDB.",
        },
        {
          value: "C",
          label: "Amazon Elastic Block Store.",
        },
        {
          value: "D",
          label: "Amazon Redshift.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "As part of the Enterprise support plan, who is the primary point of contact for ongoing support needs?",
      options: [
        {
          value: "A",
          label: "AWS Identity and Access Management (IAM) user.",
        },
        {
          value: "B",
          label: "Infrastructure Event Management (IEM) engineer.",
        },
        {
          value: "C",
          label: "AWS Consulting Partners.",
        },
        {
          value: "D",
          label: "Technical Account Manager (TAM).",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "How can you view the distribution of AWS spending in one of your AWS accounts?",
      options: [
        {
          value: "A",
          label: "By using Amazon VPC console.",
        },
        {
          value: "B",
          label: "By contacting the AWS Support team.",
        },
        {
          value: "C",
          label: "By using AWS Cost Explorer.",
        },
        {
          value: "D",
          label: "By contacting the AWS Finance team.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "Which of the following must an IAM user provide to interact with AWS services using the AWS Command Line Interface (AWS CLI)?",
      options: [
        {
          value: "A",
          label: "Access keys.",
        },
        {
          value: "B",
          label: "Secret token.",
        },
        {
          value: "C",
          label: "UserID.",
        },
        {
          value: "D",
          label: "User name and password.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "You have AWS Basic support, and you have discovered that some AWS resources are being used maliciously, and those resources could potentially compromise your data. What should you do?",
      options: [
        {
          value: "A",
          label: "Contact the AWS Customer Service team.",
        },
        {
          value: "B",
          label: "Contact the AWS Abuse team.",
        },
        {
          value: "C",
          label: "Contact the AWS Concierge team.",
        },
        {
          value: "D",
          label: "Contact the AWS Security team.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "Select TWO examples of the AWS shared controls.",
      options: [
        {
          value: "A",
          label: "Patch Management.",
        },
        {
          value: "B",
          label: "IAM Management.",
        },
        {
          value: "C",
          label: "VPC Management.",
        },
        {
          value: "D",
          label: "Configuration Management.",
        },
        {
          value: "E",
          label: "Data Center operations.",
        },
      ],
      correctAnswers: ["A", "D"],
      exam: "1",
    },
    {
      text: "In order to implement best practices when dealing with a \u201cSingle Point of Failure,\u201d you should attempt to build as much automation as possible in both detecting and reacting to failure. Which of the following AWS services would help? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "ELB.",
        },
        {
          value: "B",
          label: "Auto Scaling.",
        },
        {
          value: "C",
          label: "Amazon Athen.",
        },
        {
          value: "D",
          label: "ECR.",
        },
        {
          value: "E",
          label: "Amazon EC2.",
        },
      ],
      correctAnswers: ["A", "B"],
      exam: "1",
    },
    {
      text: "A company is planning to host an educational website on AWS. Their video courses will be streamed all around the world. Which of the following AWS services will help achieve high transfer speeds?",
      options: [
        {
          value: "A",
          label: "Amazon SNS.",
        },
        {
          value: "B",
          label: "Amazon Kinesis Video Streams.",
        },
        {
          value: "C",
          label: "AWS CloudFormation.",
        },
        {
          value: "D",
          label: "Amazon CloudFront.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "A developer is planning to build a two-tier web application that has a MySQL database layer. Which of the following AWS database services would provide automated backups for the application?",
      options: [
        {
          value: "A",
          label: "A MySQL database installed on an EC2 instance.",
        },
        {
          value: "B",
          label: "Amazon Aurora.",
        },
        {
          value: "C",
          label: "Amazon DynamoDB.",
        },
        {
          value: "D",
          label: "Amazon Neptune.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "What is the AWS service that enables AWS architects to manage infrastructure as code?",
      options: [
        {
          value: "A",
          label: "AWS CloudFormation.",
        },
        {
          value: "B",
          label: "AWS Config.",
        },
        {
          value: "C",
          label: "Amazon SES.",
        },
        {
          value: "D",
          label: "Amazon EMR.",
        },
      ],
      correctAnswers: ["A"],
      exam: "1",
    },
    {
      text: "Under the shared responsibility model, which of the following is the responsibility of AWS?",
      options: [
        {
          value: "A",
          label: "Client-side encryption.",
        },
        {
          value: "B",
          label: "Configuring infrastructure devices.",
        },
        {
          value: "C",
          label: "Server-side encryption.",
        },
        {
          value: "D",
          label: "Filtering traffic with Security Groups.",
        },
      ],
      correctAnswers: ["B"],
      exam: "1",
    },
    {
      text: "What does the AWS Health Dashboard provide? (Choose TWO)",
      options: [
        {
          value: "A",
          label:
            "Detailed troubleshooting guidance to address AWS events impacting your resources.",
        },
        {
          value: "B",
          label: "Health checks for Auto Scaling instances.",
        },
        {
          value: "C",
          label: "Recommendations for Cost Optimization.",
        },
        {
          value: "D",
          label: "A dashboard detailing vulnerabilities in your applications.",
        },
        {
          value: "E",
          label: "Personalized view of AWS service health.",
        },
      ],
      correctAnswers: ["A", "E"],
      exam: "1",
    },
    {
      text: "You have deployed your application on multiple Amazon EC2 instances. Your customers complain that sometimes they can\u2019t reach your application. Which AWS service allows you to monitor the performance of your EC2 instances to assist in troubleshooting these issues?",
      options: [
        {
          value: "A",
          label: "AWS Lambda.",
        },
        {
          value: "B",
          label: "AWS Config.",
        },
        {
          value: "C",
          label: "Amazon CloudWatch.",
        },
        {
          value: "D",
          label: "AWS CloudTrail.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "Your company is developing a critical web application in AWS, and the security of the application is a top priority. Which of the following AWS services will provide infrastructure security optimization recommendations?",
      options: [
        {
          value: "A",
          label: "AWS Shield.",
        },
        {
          value: "B",
          label: "AWS Management Console.",
        },
        {
          value: "C",
          label: "AWS Secrets Manager.",
        },
        {
          value: "D",
          label: "AWS Trusted Advisor.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
    {
      text: "Which of the following is not a benefit of Amazon S3? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "Amazon S3 provides unlimited storage for any type of data.",
        },
        {
          value: "B",
          label: "Amazon S3 can run any type of application or backend system.",
        },
        {
          value: "C",
          label:
            "Amazon S3 stores any number of objects, but with object size limits.",
        },
        {
          value: "D",
          label:
            "Amazon S3 can be scaled manually to store and retrieve any amount of data from anywhere.",
        },
        {
          value: "E",
          label:
            "Amazon S3 provides 99.999999999% (11 9\u2019s) of data durability.",
        },
      ],
      correctAnswers: ["B", "D"],
      exam: "1",
    },
    {
      text: "In the AWS Shared responsibility Model, which of the following are the responsibility of the customer? (Choose TWO)",
      options: [
        {
          value: "A",
          label: "Disk disposal.",
        },
        {
          value: "B",
          label: "Controlling physical access to compute resources.",
        },
        {
          value: "C",
          label: "Patching the Network infrastructure.",
        },
        {
          value: "D",
          label: "Setting password complexity rules.",
        },
        {
          value: "E",
          label: "Configuring network access rules.",
        },
      ],
      correctAnswers: ["D", "E"],
      exam: "1",
    },
    {
      text: "What does AWS provide to deploy popular technologies such as IBM MQ on AWS with the least amount of effort and time?",
      options: [
        {
          value: "A",
          label: "Amazon Aurora.",
        },
        {
          value: "B",
          label: "Amazon CloudWatch.",
        },
        {
          value: "C",
          label: "AWS Quick Start reference deployments.",
        },
        {
          value: "D",
          label: "AWS OpsWorks.",
        },
      ],
      correctAnswers: ["C"],
      exam: "1",
    },
    {
      text: "An organization has decided to purchase an Amazon EC2 Reserved Instance (RI) for three years in order to reduce costs. It is possible that the application workloads could change during the reservation period. What is the EC2 Reserved Instance (RI) type that will allow the company to exchange the purchased reserved instance for another reserved instance with higher computing power if they need to?",
      options: [
        {
          value: "A",
          label: "Elastic RI.",
        },
        {
          value: "B",
          label: "Premium RI.",
        },
        {
          value: "C",
          label: "Standard RI.",
        },
        {
          value: "D",
          label: "Convertible RI.",
        },
      ],
      correctAnswers: ["D"],
      exam: "1",
    },
  ]);

  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  const totalQuestions = questions.length;
  const minScore = 100;
  const maxScore = 1000;
  const passingScore = 700;

  const handleAnswer = (answer: string[]) => {
    const correctAnswers = questions[currentQuestionIndex].correctAnswers;

    if (isEqual(sortBy(correctAnswers), sortBy(answer))) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => {
        if (prevScore === 0) {
          return 0;
        }
        return prevScore - 1;
      });
    }
  };

  const nextQuestion = () => {
    // Move to the next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      return;
    }
  };
  return (
    <>
      <Question
        question={questions[currentQuestionIndex]}
        number={currentQuestionIndex + 1}
        handleAnswer={handleAnswer}
        nextQuestion={nextQuestion}
      />
    </>
  );
}
