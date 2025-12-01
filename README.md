Playing_with_API_summative – API-Enhanced Web Application

This project is part of the ALU Web Infrastructure Summative Assessment.
It demonstrates practical use of external APIs, client-side scripting, UI interaction, and a full deployment workflow across two servers and a load balancer.

The application includes:

A Google Translate widget for multilingual accessibility

A University Search feature powered by a public API

Error handling for API downtime or blocked requests

A clean, responsive user interface

A documented deployment process for Web01, Web02, and LB01

1. Project Overview
Purpose

The aim of this project is to build an interactive web application that uses external APIs and can be deployed across a multi-server infrastructure behind a load balancer.

Description

The application allows users to:

Translate page content into different languages

Search universities by country (and optionally by name)

View real-time results or fallback sample data

Interact with a simple and intuitive UI

The project combines accessibility, API usage, and practical web deployment.

2. Features
A. Google Translate Integration

Adds multilingual accessibility for a more inclusive user experience.

B. University Search API

Uses the Hipolabs Universities API to fetch university data:

Search by country

Filter by university name (optional)

Handle API downtime or blocked requests

If the API cannot be reached, the system displays safe fallback sample data.

C. Error Handling

The interface shows:

Clear connection error messages

Fallback results

User-friendly guidance

D. Interactive UI

Users can:

Search

Filter

View dynamically updated results

3. File Structure
/
├── index.html
├── assets/
│    ├── style.css
│    └── script.js
└── README.md

4. API Attribution
Google Translate

Used to provide multilingual accessibility.

Hipolabs Universities API

https://universities.hipolabs.com

Used to retrieve university information.

5. Deployment Process (Required for Web Infrastructure)

This section documents the full deployment steps for Web01, Web02, and LB01.

5.1 Preparing Web01

SSH into Web01

ssh ubuntu@<WEB01-IP>


Install nginx

sudo apt update
sudo apt install nginx -y


Clone the repository

git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git


Move project files to web root

sudo cp -r Playing_with_API_summative/* /var/www/html/


Restart nginx

sudo systemctl restart nginx

5.2 Repeat the Same Steps on Web02

Follow the same procedure for Web02 to mirror the content.

5.3 Load Balancer Configuration (LB01)

SSH into LB01

ssh ubuntu@<LB01-IP>


Install nginx

sudo apt update
sudo apt install nginx -y


Edit the nginx config

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


Restart nginx

sudo systemctl restart nginx

6. Deployment Challenges

(Required because Web01/Web02 access failed)

During deployment, the ALU-provided Web01 and Web02 servers stopped accepting SSH connections.

Actions attempted:

Regenerating SSH key pairs

Using RSA and ED25519 keys

Adding new keys to authorized_keys

Testing through VPN and non-VPN networks

Requesting new server instances

Clearing known_hosts (host key mismatch fixes)

Using multiple devices and terminals

Verifying server-side JSON data for IP and user mappings

Despite matching key formats and correct setup, the servers continued to reject access.

Proof of Attempts

Screenshots documenting the process were uploaded:

SSH permission denied - Since I am a resubmission student and my computer crashed, I was unable to retrieve saved key pair and it is a different computer I am using. Also the previous free domain subscription I was given has expired, thats why I had to find an alternative. 

Host key mismatch 

Unresponsive servers on browser - Requesting new servers only brought me the same servers configured to the previous key and dependables

Load balancer timeout pages - Same for the load balancer

Server panel screenshots

Drive link (Screenshots):
https://drive.google.com/drive/folders/1x2ic4A22d8sK1Mj6ZGWFfEJRnF2ichZ0?usp=sharing

Mitigation

To ensure the summative remains valid:

The full deployment workflow has been documented

All configurations for Web01, Web02, and LB01 are provided

The application is fully functional and live via GitHub Pages

The load balancer config can be immediately applied once server access is restored

7. Live Demo Links
Live Application

https://chukwukaj.github.io/Playing_with_API_summative/

Demo Video

https://drive.google.com/file/d/1JksM91RHvO0SOVE6HQw2XHnqkhibD6yJ/view?usp=drive_link

GitHub Repository

https://github.com/ChukwukaJ/Playing_with_API_summative

8. How to Run Locally
git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git
cd Playing_with_API_summative
open index.html


Or on Windows:
Double-click index.html.

9. Credits

Google Translate

Hipolabs Universities API