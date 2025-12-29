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

**STEP 1: Create S3 Bucket for Static Website**

1. Go to S3 Console

       Click Create bucket

2. Bucket details

       Name: my-static-site-yourbucketname
   
       Region: choose same region as EC2
   
       Uncheck Block all public access
   
       Confirm “I acknowledge…”

3. Enable Static Website Hosting

       Go to Properties → Static website hosting
  
       Enable
  
       Index document: index.html


4. Upload Files to S3

   Prepare index.html:

       <!DOCTYPE html>
   
       <html>

       <head>

       <title>My Demo App</title>

       </head>

       <body>

       <h1>Hello from S3 Static Website!</h1>

       <button onclick="callAPI()">Click to Call Backend</button>

       <p id="result"></p>

       <script>

        async function callAPI() {

        const response = await fetch("http://EC2_PUBLIC_IP/api");

        const data = await response.json();

        document.getElementById("result").innerText = data.message;

        }

        </script>

        </body>
   
        </html>

   Upload this to S3.

5. Update Bucket Policy (Make Public)

   Use this policy (replace BUCKET_NAME):

       {
   
        "Version": "2012-10-17",

        "Statement": [

        {

          "Sid": "PublicRead",

          "Effect": "Allow",

          "Principal": "*",

          "Action": "s3:GetObject",

          "Resource": "arn:aws:s3:::BUCKET_NAME/*"

           }
         ]
       }

**STEP 2: Create IAM Role for EC2**

1. Go to IAM → Roles → Create Role

    Trusted entity: EC2

    Attach policy: AmazonS3FullAccess (for learning)

2. Name it:

    EC2-S3-Access-Role

**STEP 3: Launch EC2 Instance**

1. Choose:

   Amazon Linux 2 / Ubuntu

   t2.micro

   Attach role: EC2-S3-Access-Role

2. Security Group

   Allow:

   SSH → Your IP

   HTTP (80) → Anywhere

   (Optional) CORS for API → 0.0.0.0/0

**STEP 4: Install Backend API on EC2**

  Choose Node.js API (simple).

      sudo yum update -y
      
      sudo yum install -y nodejs

  Create API directory
      
      mkdir backend
      
      cd backend

  Create server.js
      const http = require("http");
  
      const server = http.createServer((req, res) => {

      // CORS HEADERS (IMPORTANT)
      
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      
      res.setHeader("Access-Control-Allow-Headers", "*");

      // Handle preflight request
      
      if (req.method === "OPTIONS") {
      
        res.writeHead(200);
        
        res.end();
        
        return;
      
      }

      if (req.url === "/api") {
      
        res.writeHead(200, { "Content-Type": "application/json" });
        
        res.end(JSON.stringify({ message: "Hello from EC2 API!" }));
      
      }

    });

    server.listen(80, () => {
    
    console.log("Server running on port 80");
    });

Run the API
      sudo node server.js

**STEP 5: Update S3 Website Code With EC2 IP**

In index.html, replace:

      const response = await fetch("http://EC2_PUBLIC_IP/api");

**STEP 6: Configure CORS in S3 (IMPORTANT)**

Go to S3 → Bucket

Permissions → CORS

Add:

    [
     
      {
      
        "AllowedHeaders": ["*"],
        
        "AllowedMethods": ["GET"],
        
        "AllowedOrigins": ["*"],
        
        "ExposeHeaders": []
      }
    ]

**STEP 7: Test the Full Flow**

1. Open S3 Website URL

   (URL will look like:)

        http://my-static-site.s3-website-us-east-1.amazonaws.com

2. Click Button

   Expected result:

         Hello from EC2 API!

   If working, your project is successful
      

  
