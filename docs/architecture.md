# Recruiter Engagement Platform

## Overview

The Recruiter Engagement Platform is a portfolio application designed to showcase technical skills while demonstrating modern software engineering practices such as event-driven architecture, asynchronous processing, cloud deployment, and infrastructure as code.

## Goals

* Showcase projects and technical skills
* Allow recruiters to contact the candidate
* Track recruiter engagement
* Generate notifications when recruiters interact with the platform
* Demonstrate Laravel, React, MySQL, AWS, and CloudFormation expertise

## Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Backend

* Laravel 13
* REST API
* Events & Listeners
* Queue Jobs

### Database

* MySQL

### AWS (Phase 2)

* EC2
* RDS
* S3
* SQS
* SNS
* CloudWatch
* CloudFormation

## High-Level Architecture

Recruiter
↓
React Frontend
↓
Laravel API
↓
MySQL Database

Laravel Events
↓
Listeners
↓
Queue Jobs
↓
Notifications & Activity Logs

## Event-Driven Flow Example

Resume Download:

1. Recruiter clicks Download Resume.
2. React calls Laravel API.
3. Laravel fires ResumeDownloaded event.
4. Listener dispatches Queue Job.
5. Queue Job:

   * Stores event data
   * Sends notification
   * Writes activity log
6. Resume download begins.

## MVP Features

### Public Pages

* Home
* About Me
* Skills
* Projects
* Resume Download
* Contact Form

### Recruiter Actions

* Profile Visit
* Resume Download
* Contact Message
* Interview Request

### Admin Dashboard

* View Recruiter Events
* View Messages
* Activity Timeline
* Event Statistics
