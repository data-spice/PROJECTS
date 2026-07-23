# Expense Tracker Backend

FastAPI backend for the Expense Tracker application.

## Setup

```bash
cd expense_tracker/backend
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Update `DATABASE_URL` in `.env` if your PostgreSQL credentials differ.
The included Docker Compose database is exposed on host port `5433`.

For deployment, Render will inject `DATABASE_URL` and `CORS_ORIGINS` as environment variables.

## Database

Create the database and run the schema:

```bash
createdb expense_tracker
psql -d expense_tracker -f ../database/schema.sql
```

## Run

```bash
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

## Render Deployment

The repository includes a [render.yaml](/home/vic/Desktop/PROJECTS/project_2_EXPENSE_TRACKER/expense_tracker/render.yaml) blueprint for the backend.

Required env vars on Render:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `CORS_ORIGINS`: Your Vercel frontend URL
- `PYTHON_VERSION`: `3.13.0`

## Endpoints

- `GET /`
- `GET /expenses`
- `POST /expenses`
- `DELETE /expenses/{id}`
- `GET /expenses/category/{category}`
- `GET /expenses/total`
