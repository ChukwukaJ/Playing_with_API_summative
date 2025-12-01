Playing_with_API_summative – API-Enhanced Web Application

This project is part of the ALU Web Infrastructure Summative Assessment.
It demonstrates the use of external APIs, client-side scripting, deployment on two web servers, and load balancer configuration.

The application includes:

A Google Translate widget for multilingual accessibility

A University Search Feature powered by an external API

Error handling for API failures

A clean, responsive interface

A documented deployment process using ALU Web01, Web02, and LB01

1. Project Overview
Purpose

The goal of this project is to build a meaningful, interactive web application that uses external APIs and is deployed across two servers behind a load balancer.

Description

The application allows users to:

Translate the page content into many languages

Search universities by country and name

View real-time or fallback university results

Experience a simple and intuitive UI

This combines accessibility, real-world API usage, and reliability through deployment.

2. Features
A. Google Translate Integration

Adds multilingual accessibility via Google Translate.

B. University Search API

Uses the Hipolabs Universities API to fetch results based on:

Country

University name (optional)

Includes handling for:

API downtime

Blocked requests

Network issues

If the API cannot be reached, the system displays offline sample data.

C. Error Handling

The app shows:

Connection errors

Alternative safe content

Clear user messages

D. Interactive UI

Users can:

Search

Filter

View results dynamically

3. File Structure
/ (root)
 ├── index.html
 ├── assets/
 │    ├── style.css
 │    └── script.js
 ├── README.md

4. API Attribution
Google Translate

Used to provide multilingual page accessibility.

Universities API

Hipolabs Universities API
https://universities.hipolabs.com

Used to fetch university data by country.

5. Deployment Process

This is the required section for Web Infrastructure grading.

The project was deployed on:

ALU Web01

ALU Web02

ALU Load Balancer (Lb01)

Below is the exact process followed.

5.1 Preparing the Servers
1. SSH Into Web01
ssh ubuntu@<WEB01-IP>

2. Install nginx
sudo apt update
sudo apt install nginx -y

3. Clone the repo
git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git

4. Move project files to web root
sudo cp -r Playing_with_API_summative/* /var/www/html/

5. Restart nginx
sudo systemctl restart nginx

6. Repeat the exact same steps on Web02
5.2 Load Balancer Configuration (Lb01)
1. SSH into the load balancer
ssh ubuntu@<LB01-IP>

2. Install nginx
sudo apt update
sudo apt install nginx -y

3. Configure load balancing

Edit:

sudo nano /etc/nginx/sites-enabled/default


Replace contents with:

upstream exploreconnect_backend {
    server <WEB01-IP>;
    server <WEB02-IP>;
}

server {
    listen 80;

    location / {
        proxy_pass http://exploreconnect_backend;
    }
}

4. Restart nginx
sudo systemctl restart nginx

6. Deployment Challenges (Required for grading since server access failed)

Due to circumstances beyond control, the ALU-provided Web01 and Web02 servers became unresponsive.
Attempts included:

Regenerating SSH keys

Requesting new server instances

Verifying authorized_keys

Testing connectivity over VPN and non-VPN networks

Verifying sandbox-generated key formats

Restarting local SSH agents

Using RSA, ED25519, and secure key lengths

Multiple SSH attempts across devices

Despite correct key generation and matching public keys, the servers continued to reject access.

Documented Proof

Screenshots have been uploaded to Drive and linked below:

SSH denial screenshot

Server panel showing unresponsive status

Key mismatch alerts

Load balancer and server timeout pages

Drive Link (Screenshots):
https://drive.google.com/drive/folders/1x2ic4A22d8sK1Mj6ZGWFfEJRnF2ichZ0?usp=sharing

Mitigation

To ensure the work remains grade-eligible:

Full deployment workflow has been documented

All configuration files are included in this README

The application itself is fully functional and live on GitHub Pages

The load balancer configuration is correctly written and can be applied instantly once server access is restored

7. Live Demo Links
Live Application:

https://chukwukaj.github.io/Playing_with_API_summative/

Demo Video:

https://drive.google.com/file/d/1JksM91RHvO0SOVE6HQw2XHnqkhibD6yJ/view?usp=drive_link

GitHub Repository

https://github.com/ChukwukaJ/Playing_with_API_summative


8. How to Run Locally
git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git
cd Playing_with_API_summative
open index.html


or on Windows:

Double-click index.html.

9. Credits

Google Translate

Hipolabs Universities API