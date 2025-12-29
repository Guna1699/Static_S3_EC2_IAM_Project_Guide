# Static_S3_EC2_IAM_Project_Guide
A website hosted on S3, API running on EC2, and IAM securing backend access.

**Architecture**
  S3 → Static Website (HTML, CSS, JS)
  EC2 → Backend API (Node.js / Python)
  IAM Role on EC2 → Access S3 (upload/download)
  CloudFront (optional)

**Key Features**
  S3 static site hosting
  EC2 reads/writes user files to S3 using IAM role
  No access keys required
