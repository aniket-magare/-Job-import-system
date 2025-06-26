# -Job-import-system
 Job Import System

A full-stack job importer and logging dashboard that reads job data from remote feeds, queues them for processing with Redis + BullMQ, stores results in MongoDB, and provides a user-friendly interface for tracking job statuses.

---
 Features

- Queue-based job ingestion from multiple XML feeds
- Background processing using BullMQ and Redis
- Import logs with metrics: inserted, updated, failed, etc.
- Clean admin dashboard to view jobs and logs
- Route protection ready (easily extendable with auth)
- Modular structure (client & server folders)


Tech Stack

- Frontend: Next.js 14, TypeScript, Bootstrap
- Backend: Express.js, Node.js, MongoDB, BullMQ (Redis), Axios
- Database: MongoDB Atlas (remote) or local instance
- Queue: BullMQ with Redis (Cloud or local)
- Deployment: Vercel (Frontend), Render (Backend & Worker) 

Deployment Status
This project is fully ready for deployment, and supports:

Frontend (client/) → deploy to Vercel
Backend API (server/) → deploy to Render (as a Web Service)
Worker (queues/start-worker.js) → deploy to Render (as a Background Worker)

---

Folder Structure
client/ → Frontend (Next.js admin UI)
server/ → Backend API + queue logic

Prerequisites

- Node.js (18+)
- Redis (locally or via Redis Cloud)
- MongoDB URI (local or MongoDB Atlas)



---

Setup Instructions

Clone the Repo

```bash
git clone https://github.com/aniket-magare/-job-import-system.git
cd job-import-system

---Backend Setup (/server)
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, Redis URL, and PORT
To start server run this command :- node index.js 
To run the BullMQ worker:- node start-worker.js
you need to runboth node index.js and node start-worker.js
---Frontend Setup (/Client)

cd ../client
npm install
cp .env.example .env
# Set NEXT_PUBLIC_API_URL to backend URL (localhost or Render)
npm run dev


---Environment Variables 
--/server/.env.example
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
REDIS_URL=redis://default:<pass>@rediscloud.com:1234 // use this or use use separate "REDIS_HOST=redis-17823.crce206.ap-south-1-1.ec2.redns.redis-cloud.com
REDIS_PASSWORD="YOUR PASSWORD HERE""

REDIS_PORT=17823
QUEUE_CONCURRENCY=5 // USE only probem occurs 
BATCH_SIZE=25

Routes Overview
GET /jobs – View all processed jobs

POST /import – Import jobs from a feed

GET /logs – View import logs

GET /health – Quick API health check

Bonus Features Implemented
✅ Environment-based batch size and concurrency ✅ Scalable job import via queue ✅ Responsive admin UI ✅ Clean .gitignore with .env safety ⚙️ Deployment-ready with .env.example files

(Coming soon: Retry strategy, MongoDB Atlas & Redis Cloud switch)

