# Database Design

## users

Stores administrator information.

| Column     | Type      |
| ---------- | --------- |
| id         | bigint    |
| name       | string    |
| email      | string    |
| password   | string    |
| created_at | timestamp |
| updated_at | timestamp |

---

## messages

Stores recruiter messages.

| Column     | Type      |
| ---------- | --------- |
| id         | bigint    |
| name       | string    |
| email      | string    |
| company    | string    |
| message    | text      |
| status     | string    |
| created_at | timestamp |
| updated_at | timestamp |

### Status Values

* new
* read
* replied

---

## recruiter_events

Stores recruiter interactions.

| Column     | Type            |
| ---------- | --------------- |
| id         | bigint          |
| event_type | string          |
| name       | string nullable |
| email      | string nullable |
| metadata   | json nullable   |
| ip_address | string          |
| user_agent | text            |
| created_at | timestamp       |
| updated_at | timestamp       |

### Event Types

* profile_visited
* resume_downloaded
* message_sent
* interview_requested

## Relationships

### MVP

No complex relationships are required.

Messages and events are stored independently.

Future versions may connect recruiter events to messages using foreign keys.
