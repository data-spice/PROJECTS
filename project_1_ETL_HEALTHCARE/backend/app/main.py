from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from app.api.analytics import router as analytics_router
app = FastAPI(
    title="Healthcare Analytics API",
    version="1.0.0",
    description="Backend API for the Healthcare Data Warehouse"
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"]
)

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "Healthcare Analytics API"
    }
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
