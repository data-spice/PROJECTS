from fastapi import FastAPI
from .routers.expenses import router

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "Expense Tracker API is running!"
    }