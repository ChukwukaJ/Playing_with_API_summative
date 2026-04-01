# Playing_with_API_summative – API-Enhanced Web Application

This project is part of the **ALU Web Infrastructure Summative Assessment**.  
It demonstrates practical use of external APIs, client-side scripting, UI interaction, and deployment across two servers behind a load balancer.

The application includes:

- A **Google Translate widget** for multilingual accessibility
- A **University Search feature** powered by a public API
- **Error handling** for API downtime or blocked requests
- A **clean, responsive user interface**
- **Documented deployment process** for Web01, Web02, and LB01

---

## 1. Project Overview

### Purpose

Build an interactive web application that uses external APIs and can be deployed across a multi-server infrastructure with a load balancer.

### Description

Users can:

- Translate page content into different languages
- Search universities by country (and optionally by name)
- View real-time results or fallback sample data
- Interact with a simple and intuitive UI

The project combines accessibility, API usage, and practical web deployment.

---

## 2. Features

### A. Google Translate Integration

- Multilingual accessibility for an inclusive user experience.

### B. University Search API

- Uses the **Hipolabs Universities API** to fetch university data:
  - Search by country
  - Filter by university name (optional)
  - Handle API downtime or blocked requests
- Displays fallback sample data if the API cannot be reached.

### C. Error Handling

- Clear connection error messages
- Fallback results
- User-friendly guidance

### D. Interactive UI

- Search
- Filter
- View dynamically updated results

---

## 3. File Structure

/
├── index.html
├── assets/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── script.js
└── README.md


---

## 4. API Attribution

- **Google Translate:** Multilingual accessibility  
- **Hipolabs Universities API:** [https://universities.hipolabs.com](https://universities.hipolabs.com)

---

## 5. Deployment Process (Web Infrastructure)

### 5.1 Preparing Web01

1. SSH into Web01:

```bash
ssh ubuntu@44.202.118.163

2. Install Nginx:

sudo apt update
sudo apt install nginx -y

3. Clone the repository:
git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git

4. Move project files to web root:

sudo cp -r Playing_with_API_summative/* /var/www/html/

5. Restart Nginx:
sudo systemctl restart nginx

5.2 Repeat Steps on Web02
* SSH into Web02:
ssh ubuntu@54.236.227.215

* Follow the same steps as Web01 to mirror content.

5.3 Load Balancer Configuration (LB01)
* SSH into LB01:
ssh ubuntu@3.87.30.20

* Install Nginx:
sudo apt update
sudo apt install nginx -y

* Edit Nginx config:
sudo nano /etc/nginx/sites-enabled/default

* Replace contents with:
upstream exploreconnect_backend {
    server 44.202.118.163;
    server 54.236.215.215;
}

server {
    listen 80;

    location / {
        proxy_pass http://exploreconnect_backend;
    }
}

* Restart Nginx:
sudo systemctl restart nginx

- Deployment Challenges
Current challenges include:
Requesting new servers from ALU due to expired SSH access
Load balancer setup without a DNS
No .tech domain access token available
Previously faced issues:
Server access failures
Key mismatches
Browser timeouts

- Mitigation:

Full deployment workflow documented
Application fully functional and live via both GitHub Pages and hosted servers
Load balancer config ready for immediate application
7. Live Demo Links
Resource	Link

* Live Application (HTTP)	**http://44.202.118.163**

Live Application (GitHub Pages HTTPS)	https://chukwukaj.github.io/Playing_with_API_summative/

- Demo Video	Watch Here

GitHub Repository	https://github.com/ChukwukaJ/Playing_with_API_summative

8. How to Run Locally

git clone https://github.com/ChukwukaJ/Playing_with_API_summative.git
cd Playing_with_API_summative
open index.html


- Or on Windows:

Double-click index.html.
9. Credits
* Google Translate
* Hipolabs Universities API: https://universities.hipolabs.com

---
