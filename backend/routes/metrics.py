from fastapi import APIRouter, HTTPException, Depends
from models import DashboardMetricsDocument, DashboardMetric
from typing import List
from auth import get_current_user
from database import db
from datetime import datetime

router = APIRouter()

@router.get("/metrics", response_model=DashboardMetricsDocument)
async def get_metrics():
    doc = await db.dashboard_metrics.find_one({})
    if not doc:
        # Return default structure if not found
        return {"metrics": [], "updated_at": datetime.utcnow()}
    return doc

@router.put("/metrics", response_model=DashboardMetricsDocument)
async def update_metrics(metrics_data: DashboardMetricsDocument, current_user: str = Depends(get_current_user)):
    # Clean data
    data = metrics_data.dict()
    data["updated_at"] = datetime.utcnow()
    
    # Update or insert
    await db.dashboard_metrics.update_one(
        {}, 
        {"$set": data}, 
        upsert=True
    )
    
    return data
