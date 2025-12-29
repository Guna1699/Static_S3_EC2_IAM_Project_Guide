# Static_S3_EC2_IAM_Project_Guide
A website hosted on S3, API running on EC2, and IAM securing backend access.

**Architecture**
S3 → Static Website (HTML, CSS, JS).
EC2 → Backend API (Node.js / Python).
IAM Role on EC2 → Access S3 (upload/download).
CloudFront (optional).

**Key Features**
S3 static site hosting.
EC2 reads/writes user files to S3 using IAM role.
No access keys required.

**Project 1: Static Website on S3 + Backend API on EC2 + IAM Access**
**Architecture Overview**
1. S3 Bucket: Hosts static website (HTML/JS).
2. EC2 Instance: Backend API (Node.js / Python)
3. IAM Role: Allows EC2 to read/write data to S3
4. Flow:
Browser → S3 Website → JavaScript → EC2 API → S3
