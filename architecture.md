#  Architecture Overview: Job Import System

This document explains the system design, flow, and key components of the Job Importer project. It’s designed for scalability, maintainability, and clean separation of concerns.

---

##  High-Level Workflow

1. Import Triggered: User hits `POST /import` via the frontend dashboard.
2. Feed Fetched: Backend fetches job data from a remote JSON feed.
3. Deduplication: New jobs are filtered by unique `guid`s.
4. Batching & Queuing: Valid jobs are batched and added to BullMQ queue.
5. Worker Processing: Worker consumes jobs, processes data, and stores results.
6. Logging: Logs are created for each import operation and job result.
7. Visualization: Frontend dashboard displays jobs, statuses, and logs.

---

##  Components Breakdown

 1. Frontend (Next.js)
- Route Pages: `/jobs`, `/logs`, `/import`
- API Integration: Uses `NEXT_PUBLIC_API_URL` to hit backend routes
-UI**: Built with Bootstrap (for tables, cards, navbar)
-State Management: Minimal — uses `fetch` and component-level state

 2.Backend (Express)
-Routes:
  - `POST /import`: Main trigger
  - `GET /jobs`: Fetch processed jobs
  - `GET /logs`: View logs per import
  - `GET /health`: API ping
- Validation: Ensures required fields (`title`, `guid`, etc.) exist
- Deduplication: Skips job entries already stored by `guid`

 3.Queue (BullMQ + Redis)
- Job Queue: `job-import-queue`
- Concurrency: Set via `.env` → `QUEUE_CONCURRENCY`
- Batch Siz: Set via `.env` → `BATCH_SIZE`
- Retries: (Optionally configurable) via BullMQ `attempts` & `backoff`

4. Worker (Node script)
- File: `queues/start-worker.js`
- Role: Fetch job from queue → validate/transform → insert into MongoDB
- Logging: On job success/failure, updates import logs

5.Database (MongoDB)
- Collections:
  - `jobs`: Stores job entries
  - `logs`: Stores metadata for each import trigger (`timestamp`, `total`, `queued`, `skipped`)
- Connection: Defined in `.env` as `MONGO_URI`

---

# Deployment Layout for Deployment(if required )

| Component     | Platform  | Notes                         |
|---------------|-----------|-------------------------------|
| Frontend      | Vercel    | Set `NEXT_PUBLIC_API_URL`     |
| Backend API   | Render    | As a Web Service              |
| Worker        | Render    | As a Background Worker        |
| Redis         | Redis Cloud (or local)                   |
| MongoDB       | MongoDB Atlas (or local)                 |

---

##  Design Assumptions

- Feed contains unique "guid" per job (used for deduplication)
- Logs are required to audit each import attempt
- Workers can be scaled horizontally if needed
- ".env" variables control batch/concurrency for flexibility

---

# System Flow Diagram (Recommended)

[ Dashboard ] 
     |
[ POST /import ]
     |
[ Fetch Feed ]
     |
[ Validate + Dedup ]
     |
[ Push to BullMQ Queue ]
     |
[ Worker Consumes ]
     |
[ Process + Save + Log ]
     |
[ GET /jobs | GET /logs ]
     |
[ Dashboard Views ]

# Flow Diagram of how data moves from source -- processor -- database -- UI. (backend-first perspective)
[ XML Feed ] 
     |
[ Express Server ]
     |
[ BullMQ Queue ] 
     |
[ Worker ]
     |
[ MongoDB: jobs + import_logs ]
     |
[ Admin UI: /jobs + /logs ]
