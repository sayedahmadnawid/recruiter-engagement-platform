
# Recruiter Engagement Platform (RecruitSignal)

RecruitSignal is a full-stack, cloud-native application designed to demonstrate modern software engineering practices using **Laravel**, **React**, and **AWS**.

## 🎯 Project Goals
The goal of this project is not only to build a functional application, but to showcase how a production-like system is designed, developed, and evolved using industry-standard architecture principles such as event-driven design, modular backend services, and cloud infrastructure automation.

## 🚀 Ongoing Evolution & Serverless Architecture
In my spare time, I am constantly evolving the platform by architecting and deploying new features to expand its capabilities. A major focus of this ongoing development is the integration of AWS Lambda functions to transform the system into a highly responsive, event-driven application. 

By decoupling intensive backend tasks—such as processing candidate data pipeline events, handling real-time notifications, and managing asynchronous background queues—into serverless functions, I am actively demonstrating how the application can dynamically scale on-demand while maintaining a lean, highly efficient cloud infrastructure footprint.

---

## 🌐 Live Demo
Production URL:
https://recruitsignal.app

RecruitSignal is a recruiter engagement platform that helps organizations collect, manage, and process candidate inquiries through a modern web application built with Laravel, React, Docker, and AWS.

---

## Purpose of the Project

This project is built as a personal engineering portfolio to demonstrate:

* Full-stack development skills (Laravel + React)
* RESTful API design and backend architecture
* Event-driven system design using queues and background jobs
* Database modeling and relational design
* Cloud deployment using AWS services
* Infrastructure-as-Code (CloudFormation)
* Professional Git workflow and documentation practices

The target audience includes recruiters, hiring managers, and engineering teams evaluating real-world development capability.

---

## Core Idea

RecruitSignal simulates a recruiter engagement system where:

* Recruiters can discover a developer profile and portfolio
* Recruiters can subscribe to updates
* System events are triggered when changes occur (new project, resume update, deployment)
* Notifications are sent asynchronously to subscribed recruiters

This creates a real-world event-driven communication system between application changes and external users.

---

## System Evolution

This project will be developed in structured phases to simulate real-world software delivery:

### Phase 1: Foundation

* Project structure setup
* Documentation (architecture, API, database design)
* Laravel backend initialization
* Database schema design

### Phase 2: Core Backend

* Recruiter management API
* Project management API
* Subscription system
* Basic authentication layer

### Phase 3: Event-Driven System

* Laravel event system implementation
* Queue workers setup
* Notification service
* Email delivery integration (AWS SES)

### Phase 4: Frontend Development

* React-based UI
* Recruiter dashboard
* Project showcase interface
* Subscription UI

### Phase 5: Cloud Infrastructure

* AWS EC2 deployment
* CI/CD pipeline setup
* CloudFormation infrastructure provisioning
* Production environment configuration

### Phase 6: Optimization & Scaling

* Logging and monitoring
* Performance optimization
* Error handling improvements
* Scalability improvements using AWS services

---

## Development Philosophy

This project follows a professional engineering approach:

* Incremental development with clear commits
* Documentation-first design
* Separation of concerns between frontend, backend, and infrastructure
* Event-driven architecture for scalability
* Production-like deployment practices

Each commit is intended to represent a meaningful step in system evolution, not just code changes.

---

## Architecture Diagram
<p align="center">
<pre>

                    ┌─────────────┐
                    │   End User  │
                    └──────┬──────┘
                           │ HTTPS
                           ▼
                 ┌────────────────────┐
                 │ recruitsignal.app  │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │  Nginx (Docker)    │
                 │ Reverse Proxy      │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ Laravel API        │
                 │ PHP 8.4            │
                 │ Docker Container   │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ Amazon RDS MySQL   │
                 │ Managed Database   │
                 └────────────────────┘

                 ┌────────────────────┐
                 │ Queue Worker       │
                 │ Laravel Queues     │
                 │ Docker Container   │
                 └────────────────────┘
</pre>
</p>
---

## Tech Stack

### Frontend
* React
* Vite
* Tailwind CSS
* Axios
* React Router
### Backend
* Laravel 12/13
* PHP 8.4
* Laravel Queue Workers
* RESTful API
### Database
* Amazon RDS MySQL
### Infrastructure
* AWS EC2 (Ubuntu)
* Docker
* Docker Compose
* Nginx
* Let's Encrypt SSL
### DevOps
* Git
* GitHub
* GitHub Actions (CI/CD)
* Dockerized Production Deployment

---
### Deployment Workflow Architecture

<p align="center">
<pre>
       Developer
           │
           │ Push Code
           ▼
   GitHub Repository
           │
           │ GitHub Actions
           ▼
     CI/CD Pipeline
           │
           │ Secure SSH Deployment
           ▼
     AWS EC2 Server
           │
           ├── Pull Latest Code
           ├── Rebuild Containers
           ├── Restart Services
           └── Verify Deployment
           │
           ▼
   recruitsignal.app
</pre>
</p>

### Deployment Process
1. Developer creates a feature branch.
2. Changes are committed and pushed to GitHub.
3. A Pull Request is reviewed and merged into main.
4. GitHub Actions automatically triggers the deployment workflow.
5. The workflow connects securely to the AWS EC2 instance.
6. Docker containers are rebuilt and restarted.
7. The updated application becomes available at https://recruitsignal.app.

## Goal

By the end of this project, the system will simulate a real-world SaaS-style recruiter engagement platform with scalable architecture, asynchronous event processing, and cloud deployment—serving as a strong demonstration of full-stack and cloud engineering capabilities.
