Playing_with_API_summative – API-Enhanced Web Application

This project is part of the ALU Web Infrastructure Summative Assessment.
It demonstrates practical use of external APIs, client-side scripting, interactive UI, and a multi-server deployment workflow behind a load balancer.

Features
Google Translate Widget
Adds multilingual accessibility for a more inclusive user experience.
University Search Feature
Powered by the Hipolabs Universities API
:
Search by country
Optional filter by university name
Safe fallback data if the API is unreachable
Error Handling
Clear connection error messages
Fallback results
User-friendly guidance
Interactive UI
Search, filter, and view dynamically updated results
Clean, responsive layout
File Structure
/
├── index.html
├── assets/
│    ├── css/main.css
│    ├── js/script.js
│    └── images/
└── README.md

API Attribution
Google Translate – Multilingual accessibility
Hipolabs Universities API – University data: https://universities.hipolabs.com
Deployment Process

Note: Use HTTP to access the servers unless HTTPS is configured.
GitHub Pages is available as an alternative and uses HTTPS.

1. Prepare Web01

SSH into Web01:

ssh ubuntu@44.202.118.163


Install Nginx:

sudo apt update
sudo apt install nginx -y


Clone the repository:

git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git


Move project files to the web root:

sudo cp -r Playing_with_API_summative/* /var/www/html/


Restart Nginx:

sudo systemctl restart nginx


Access the application: http://44.202.118.163

2. Prepare Web02

SSH into Web02:

ssh ubuntu@54.236.227.215


Repeat the same steps as Web01 to mirror the content.

Access the application: http://54.236.227.215

3. Configure Load Balancer (LB01)

SSH into LB01:

ssh ubuntu@3.87.30.20


Install Nginx:

sudo apt update
sudo apt install nginx -y


Edit the Nginx configuration:

sudo nano /etc/nginx/sites-enabled/default


Replace the contents with:

upstream exploreconnect_backend {
    server 44.202.118.163;
    server 54.236.227.215;
}

server {
    listen 80;

    location / {
        proxy_pass http://exploreconnect_backend;
    }
}


Restart Nginx:

sudo systemctl restart nginx


Access the application via the load balancer: http://3.87.30.20

Deployment Challenges

Current challenges:

No DNS setup – Access is via IP addresses
No .tech domain or access token – Limits HTTPS for the live servers
Server requests – Occasionally new servers must be requested if access is lost
Load balancer – Timeout pages if backend servers are unreachable

Previous issues (for reference):

SSH connection failures
Host key mismatches
Temporary unresponsive servers

Resolution:

Application is fully hosted on our servers with correct IPs and accessible via HTTP
Also hosted on GitHub Pages as an HTTPS alternative: https://chukwukaj.github.io/Playing_with_API_summative/

Screenshots and proofs of previous deployment attempts:
Google Drive – SSH & Server Issues

Live Demo
Live Servers (HTTP):
Web01: http://44.202.118.163
Web02: http://54.236.227.215
Load Balancer: http://3.87.30.20
GitHub Pages (HTTPS): https://chukwukaj.github.io/Playing_with_API_summative/
Demo Video: Watch Here
GitHub Repository: Playing_with_API_summative
How to Run Locally

Clone the project:

git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git
cd Playing_with_API_summative
open index.html   # Linux / Mac


Or on Windows:
Double-click index.html.

Credits
Google Translate – Multilingual accessibility
Hipolabs Universities API – University search data
Notes
Use HTTP to access the servers (44.202.118.163, 54.236.227.215, 3.87.30.20)
HTTPS available via GitHub Pages
Demonstrates front-end development, API integration, and server deployment skills
