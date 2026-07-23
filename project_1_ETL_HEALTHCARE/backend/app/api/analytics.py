from fastapi import APIRouter

from app.services.analytics_service import AnalyticsService

router = APIRouter()


@router.get("/monthly-admissions")
def monthly_admissions():
    return AnalyticsService.monthly_admissions()


@router.get("/bed-utilization")
def bed_utilization():
    return AnalyticsService.bed_utilization()


@router.get("/disease-trends")
def disease_trends():
    return AnalyticsService.disease_trends()


@router.get("/lab-workload")
def lab_workload():
    return AnalyticsService.lab_workload()


@router.get("/inventory")
def inventory():
    return AnalyticsService.medication_inventory()