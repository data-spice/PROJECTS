# Expense Tracker Frontend

React + TypeScript frontend for the Expense Tracker application.

## Setup

```bash
cd expense_tracker/frontend
npm install
```

Create `.env` if your API is not running at `http://localhost:8000`:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

For deployment, use `vercel.json` for SPA routing and set `VITE_API_BASE_URL` to the backend URL.

## Run

```bash
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

## Vercel Deployment

Deploy from `expense_tracker/frontend`.

Set this environment variable in Vercel:

```text
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```
