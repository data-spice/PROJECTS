# Expense Tracker

A full-stack expense tracker built with FastAPI, PostgreSQL, SQLAlchemy, React, TypeScript, Vite, Tailwind CSS, Axios, and React Router.

## Project Structure

```text
expense_tracker/
├── backend/
├── frontend/
├── database/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

- Python 3.13
- Node.js 20 or newer
- PostgreSQL 16 or Docker

## Free Deployment

Recommended setup:

- Database: Neon free Postgres
- Backend: Render free web service
- Frontend: Vercel free static site

Deployment files included:

- [render.yaml](/home/vic/Desktop/PROJECTS/project_2_EXPENSE_TRACKER/expense_tracker/render.yaml)
- [frontend/vercel.json](/home/vic/Desktop/PROJECTS/project_2_EXPENSE_TRACKER/expense_tracker/frontend/vercel.json)

## Database

Using Docker:

```bash
cd expense_tracker
docker compose up -d postgres
```

Using a local PostgreSQL install:

```bash
createdb expense_tracker
psql -d expense_tracker -f database/schema.sql
```

## Backend

```bash
cd expense_tracker/backend
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Environment variables:

- `DATABASE_URL`: PostgreSQL SQLAlchemy connection string.
- `CORS_ORIGINS`: Comma-separated frontend origins. Defaults to `http://localhost:5173`.

The included Docker Compose database is exposed on host port `5433` to avoid colliding with local PostgreSQL installs:

```bash
DATABASE_URL=postgresql+psycopg2://expense_user:expense_password@localhost:5433/expense_tracker
```

The API runs at `http://localhost:8000`.

## Frontend

```bash
cd expense_tracker/frontend
npm install
npm run dev
```

The React app runs at `http://localhost:5173`.

Create `frontend/.env` if the backend is not on the default URL:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

For deployment, use `frontend/.env.example` as the starting point and set `VITE_API_BASE_URL` to your Render backend URL.

## Features

- Add, view, and delete expenses.
- Filter expenses by category.
- Dashboard totals for all-time, today, and current month.
- Responsive finance dashboard UI.
- FastAPI REST API with SQLAlchemy ORM and PostgreSQL.

## Deployment Steps

1. Create a GitHub repository and push this project.
2. Create a free Neon database and copy the connection string.
3. Run `database/schema.sql` in Neon to create the table and seed sample rows.
4. Deploy the backend on Render using `render.yaml`.
5. Set `DATABASE_URL` on Render to the Neon connection string.
6. Set `CORS_ORIGINS` on Render to your Vercel domain, for example:

```text
https://your-app.vercel.app
```

7. Deploy the frontend on Vercel from `expense_tracker/frontend`.
8. Set `VITE_API_BASE_URL` on Vercel to the Render backend URL, for example:

```text
https://expense-tracker-api.onrender.com
```

9. Confirm the frontend can load expenses, create records, and delete records.
