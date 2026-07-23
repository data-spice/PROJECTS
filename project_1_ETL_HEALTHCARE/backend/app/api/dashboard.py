from fastapi import APIRouter

from app.services.dashboard_services import DashboardService

router = APIRouter()


@router.get("/summary")
def dashboard_summary():
    return DashboardService.get_summary()