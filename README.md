# FlowTrack — Productivity Tracker SaaS

Full-stack productivity tracker built with React, Node/Express, and MongoDB Atlas.
Deployed on Render (both frontend and backend).

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Recharts, Axios     |
| Backend   | Node.js, Express, Mongoose          |
| Database  | MongoDB Atlas (free M0 cluster)     |
| Hosting   | Render (Static Site + Web Service)  |

---

## Local Development

### Prerequisites
- Node.js ≥ 18
- A free [MongoDB Atlas](https://cloud.mongodb.com) account
- A free [Render](https://render.com) account

### 1 — Clone the repo

git clone https://github.com/YOUR_USERNAME/flowtrack.git
cd flowtrack

### 2 — Configure the backend

cd server
cp .env.example .env
# Edit .env — paste your Atlas connection string

### 3 — Configure the frontend

cd ../client
cp .env.example .env
# For local dev the default value (http://localhost:5000/api) is fine

### 4 — Install & run both servers

# Terminal 1 — backend
cd server && npm install && npm run dev

# Terminal 2 — frontend
cd client && npm install && npm run dev

Open http://localhost:3000

### 5 — Seed sample data (optional)

cd server && npm run seed

---

## Deploy to Render

### Step 1 — MongoDB Atlas setup
1. Go to https://cloud.mongodb.com and create a free M0 cluster
2. Under **Database Access** → create a user (e.g. `flowtrack` / strong password)
3. Under **Network Access** → Add IP **0.0.0.0/0** (allow all — required for Render)
4. Click **Connect** → **Drivers** → copy the connection string:
   `mongodb+srv://flowtrack:<password>@cluster0.xxxxx.mongodb.net/flowtrack?retryWrites=true&w=majority`

### Step 2 — Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

### Step 3 — Create Render services via Blueprint
1. Go to https://render.com → **New** → **Blueprint**
2. Connect your GitHub repo → Render reads `render.yaml` and creates both services

### Step 4 — Set environment variables in Render dashboard
For **flowtrack-api** service:
- `MONGO_URI` = your Atlas connection string (from Step 1)
- `CLIENT_URL` = your flowtrack-client Render URL (e.g. `https://flowtrack-client.onrender.com`)

For **flowtrack-client** service:
- `VITE_API_URL` = your flowtrack-api Render URL + `/api`
  e.g. `https://flowtrack-api.onrender.com/api`

### Step 5 — Trigger redeploy
After setting env vars, click **Manual Deploy → Deploy latest commit** on both services.

### Step 6 — Seed production data (optional)
In the Render dashboard → flowtrack-api → **Shell**:
node src/scripts/seed.js

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (filter: status, priority, category, search, sort) |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle complete |
| GET | `/api/reports/weekly` | Weekly report |
| GET | `/api/reports/monthly` | Monthly report |
| GET | `/api/reports/analytics` | 7-day analytics |
| GET | `/health` | Health check |
