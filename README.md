# RecruitSignal — AI-Powered Recruiter Engagement Platform

RecruitSignal is a full-stack, cloud-native recruiting platform built with **Laravel, React, Docker, and AWS**.

The project started as a recruiter engagement platform and has evolved into an **AI-powered candidate management and semantic search system**. RecruitSignal uses AI to extract structured information from candidate resumes and **Pinecone vector search** to enable recruiters to discover candidates using natural-language queries based on the meaning and context of their experience.

The project is continuously evolving to demonstrate production-oriented software engineering, AI integration, cloud deployment, asynchronous processing, and modern application architecture.

---

## 🌐 Live Demo

**Production:**
https://recruitsignal.app

---

## 🎯 Project Goals

RecruitSignal is a personal engineering project designed to demonstrate how a modern recruiting platform can be designed, developed, deployed, and continuously evolved.

The primary goals are to demonstrate:

* Full-stack development using Laravel and React
* RESTful API design
* Relational database modeling
* AI-powered resume processing
* Structured candidate data extraction
* Semantic search using vector embeddings
* Pinecone vector database integration
* Asynchronous processing with Laravel queues
* Dockerized development and production environments
* AWS cloud deployment
* CI/CD automation with GitHub Actions
* Production-oriented architecture and engineering practices

The project is intended as a practical demonstration of full-stack, cloud, and AI engineering capabilities.

---

# 🚀 Current Capabilities

RecruitSignal currently provides a complete candidate ingestion and search workflow.

### Lead Management

Recruiters can:

* Create and manage leads
* View lead information
* Edit and delete leads
* Search and filter leads
* Paginate lead results
* Manage lead status

### Resume Management

Recruiters can:

* Upload candidate resumes
* Associate resumes with leads
* Extract text from uploaded PDF resumes
* Process resumes asynchronously

### AI Resume Parsing

Uploaded resumes are processed using OpenAI to extract structured candidate information.

The extracted information can include:

* Candidate name
* Email
* Phone
* Current title
* Location
* Skills
* Professional experience
* Education
* Certifications

The structured information is stored in the application's relational database and presented through the candidate profile interface.

### Candidate Profiles

RecruitSignal provides dedicated candidate profiles containing structured information extracted from resumes.

Recruiters can:

* View candidate profiles
* Edit extracted candidate information
* Review skills and experience
* Review education and certifications
* Access the associated resume

### Semantic Candidate Search

RecruitSignal now supports **semantic candidate search using Pinecone**.

Instead of relying exclusively on keyword matching, recruiters can search candidates using natural-language queries such as:

> "Find experienced Laravel developers with React and AWS experience."

The system converts candidate information and search queries into vector representations and uses Pinecone to retrieve semantically relevant candidate information.

This allows the search system to identify candidates based on the **meaning and context of their experience**, rather than requiring an exact keyword match.

---

# 🧠 AI & Semantic Search Architecture

The candidate processing pipeline currently follows this architecture:

```text
                Resume PDF
                    │
                    ▼
             Text Extraction
                    │
                    ▼
              OpenAI Parsing
                    │
                    ▼
        Structured Candidate Data
                    │
                    ├───────────────┐
                    ▼               ▼
            Candidate Profile    Embedding
                    │               │
                    │               ▼
                    │          Pinecone
                    │        Vector Index
                    │
                    ▼
             Candidate Database
```

For semantic search:

```text
        Recruiter Query
              │
              ▼
        Query Embedding
              │
              ▼
          Pinecone
              │
              ▼
     Relevant Candidates
              │
              ▼
       Candidate Profiles
```

The architecture is designed to evolve toward a complete **RAG-based recruiter search and candidate matching system**.

---

# 🔎 Semantic Search

The semantic search capability is one of the major architectural evolutions of RecruitSignal.

Traditional search might require:

```text
Laravel AND React AND AWS
```

Semantic search allows recruiters to express their intent naturally:

```text
"Find a senior backend developer who has
built scalable PHP applications and has
experience deploying systems on AWS."
```

The system can use vector similarity to retrieve candidates whose experience is semantically relevant to the query.

This provides the foundation for future capabilities such as:

* AI candidate matching
* Job-to-candidate recommendations
* Candidate ranking
* Hybrid semantic + structured search
* RAG-based recruiter assistance
* Explainable candidate recommendations

---

# 🏗️ System Architecture

```text
                         ┌──────────────────┐
                         │      Recruiter   │
                         └────────┬─────────┘
                                  │ HTTPS
                                  ▼
                         ┌──────────────────┐
                         │ recruitsignal.app│
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Nginx            │
                         │ Reverse Proxy    │
                         │ Docker           │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Laravel API      │
                         │ PHP 8.4          │
                         │ Docker           │
                         └───────┬──────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
      ┌──────────────┐   ┌───────────────┐  ┌──────────────┐
      │ Amazon RDS   │   │ Laravel Queue │  │ OpenAI       │
      │ MySQL        │   │ Worker        │  │ API          │
      └──────────────┘   └───────┬───────┘  └──────────────┘
                                 │
                                 ▼
                         ┌──────────────────┐
                         │ Pinecone         │
                         │ Vector Database  │
                         └──────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

## Backend

* Laravel 13
* PHP 8.4
* RESTful APIs
* Laravel Queue Workers
* OpenAI API

## Database

* MySQL
* Amazon RDS

## AI / Search

* OpenAI
* Embeddings
* Pinecone
* Semantic Search
* RAG architecture *(ongoing evolution)*

## Infrastructure

* AWS EC2
* Docker
* Docker Compose
* Nginx
* Let's Encrypt SSL

## DevOps

* Git
* GitHub
* GitHub Actions
* CI/CD
* Dockerized production deployment

---

# ☁️ Cloud Infrastructure

The production application is deployed on AWS.

Current infrastructure includes:

```text
AWS
│
└── EC2
    │
    ├── Nginx Container
    ├── Laravel Application Container
    └── Laravel Queue Worker
         │
         └── Amazon RDS MySQL
```

The application uses Docker Compose to manage production services on the EC2 instance.

HTTPS is configured using Let's Encrypt SSL.

---

# 🔄 CI/CD Pipeline

RecruitSignal uses GitHub Actions to automate production deployment.

```text
             Developer
                 │
                 │ Push
                 ▼
          GitHub Repository
                 │
                 │ Pull Request
                 ▼
               Review
                 │
                 │ Merge
                 ▼
                main
                 │
                 ▼
          GitHub Actions
                 │
                 ├── Run Tests
                 │
                 └── Deploy
                       │
                       │ Secure SSH
                       ▼
                  AWS EC2
                       │
                       ├── Pull Latest Code
                       ├── Rebuild Containers
                       ├── Restart Services
                       └── Verify Deployment
                       │
                       ▼
               recruitsignal.app
```

### Deployment Process

1. Create a feature branch.
2. Implement and test changes locally.
3. Commit and push changes to GitHub.
4. Open a Pull Request.
5. Review and merge the Pull Request.
6. GitHub Actions runs the CI/CD workflow.
7. Automated tests are executed.
8. The deployment connects securely to AWS EC2.
9. Production Docker containers are rebuilt and restarted.
10. The updated application becomes available through `recruitsignal.app`.

---

# 📈 System Evolution

RecruitSignal is being developed incrementally to demonstrate realistic software evolution.

### Phase 1 — Foundation

* Project architecture
* Laravel backend
* React frontend
* Database design
* REST API
* Authentication

### Phase 2 — Lead Management

* Lead CRUD
* Lead search
* Filtering
* Pagination
* Lead status management
* Dashboard analytics

### Phase 3 — Resume Processing

* Resume upload
* Resume-to-lead association
* PDF text extraction
* Asynchronous processing

### Phase 4 — AI Candidate Profiles

* OpenAI resume analysis
* Structured candidate extraction
* Candidate profile creation
* Candidate profile viewing
* Candidate profile editing

### Phase 5 — Semantic Search

* Candidate document generation
* Embedding generation
* Pinecone integration
* Vector indexing
* Semantic candidate search

### Phase 6 — AI Recruiting Intelligence

Planned capabilities include:

* Hybrid semantic + structured search
* Job management
* Candidate-to-job matching
* Candidate ranking
* RAG-based recruiter assistant
* Explainable AI recommendations
* Search evaluation and relevance measurement

---

# 🧩 Engineering Principles

RecruitSignal follows a production-oriented development approach:

### Separation of Concerns

Frontend, backend, infrastructure, AI processing, and search responsibilities are separated into appropriate application layers.

### Asynchronous Processing

Resource-intensive operations such as resume processing and AI-related workflows are designed to run through background queues where appropriate.

### API-First Architecture

The React frontend communicates with the Laravel backend through RESTful APIs.

### Incremental Development

Features are developed through isolated feature branches and meaningful commits.

### Automated Testing

Backend functionality is covered by automated tests as features are introduced.

### Cloud-Native Deployment

The production environment is containerized and deployed to AWS.

### AI as a System Component

AI functionality is integrated into the application's processing pipeline rather than treated as an isolated demonstration.

---

# 🎯 Future Direction

The long-term goal of RecruitSignal is to evolve from a candidate management application into an **AI-assisted recruiting intelligence platform**.

The next major architectural direction is to combine:

```text
Structured Candidate Data
          +
Semantic Search
          +
Vector Retrieval
          +
LLM Reasoning
          +
Recruiter Context
```

to create a system capable of helping recruiters discover, compare, and evaluate candidates using natural language.

The ultimate goal is to demonstrate how modern **full-stack engineering, cloud infrastructure, asynchronous processing, vector search, and generative AI** can be combined into a production-oriented application.

---

## 📌 Project Status

**Active Development**

RecruitSignal is an evolving personal engineering project. Features and architecture are continuously being expanded as new technologies and engineering patterns are explored.

The project serves as a practical demonstration of full-stack development, cloud engineering, AI integration, semantic search, DevOps, and production-oriented system design.
