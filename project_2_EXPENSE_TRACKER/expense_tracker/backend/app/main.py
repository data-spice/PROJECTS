from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers import expenses
from app.schemas import MessageResponse


settings = get_settings()

app = FastAPI(
    title="Expense Tracker API",
    description="REST API for tracking personal expenses.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Expense Tracker API running")


app.include_router(expenses.router)
