# API Design

Base URL:

/api

---

## Public Endpoints

### Profile Visit

POST /api/events/profile-visit

Purpose:
Track recruiter visits.

---

### Resume Download

POST /api/events/resume-download

Purpose:
Track resume downloads and trigger notifications.

---

### Interview Request

POST /api/events/interview-request

Request:

{
"name": "John Doe",
"email": "[sayed.sayedzada@gmail.com](mailto:sayed.sayedzada@gmail.com)"
}

Purpose:
Track interview requests and notify candidate.

---

### Contact Form

POST /api/messages

Request:

{
"name": "John Doe",
"email": "[sayed.sayedzada@gmail.com](mailto:sayed.sayedzada@gmail.com)",
"company": "ABC Company",
"message": "Interested in discussing an opportunity."
}

Purpose:
Store recruiter messages and generate events.

---

## Admin Endpoints

### Get Events

GET /api/admin/events

Purpose:
Retrieve recruiter activity history.

---

### Get Messages

GET /api/admin/messages

Purpose:
Retrieve recruiter messages.

---

### Update Message Status

PATCH /api/admin/messages/{id}

Request:

{
"status": "read"
}

Purpose:
Update message workflow status.

---

## Laravel Events

* RecruiterVisitedProfile
* ResumeDownloaded
* RecruiterSentMessage
* InterviewRequested

## Queue Jobs

Examples:

* SendResumeDownloadNotificationJob
* SendInterviewRequestNotificationJob
* SendRecruiterMessageNotificationJob

## Future AWS Integration

### SQS

Replace local queue driver with AWS SQS.

### SNS

Publish recruiter engagement notifications.

### CloudWatch

Store application and event logs.

### CloudFormation

Manage infrastructure as code.
