from fastapi import APIRouter, HTTPException, Depends
from models import DashboardMetricsDocument, DashboardMetric
from typing import List
from auth import verify_token
from datetime import datetime

router = APIRouter()

async def get_db():
    from server import db
    return db

@router.get("/metrics", response_model=DashboardMetricsDocument)
async def get_metrics(db = Depends(get_db)):
    doc = await db.dashboard_metrics.find_one({})
    if not doc:
        # Return default structure if not found
        return {"metrics": [], "updated_at": datetime.utcnow()}
    return doc

@router.put("/metrics", response_model=DashboardMetricsDocument)
async def update_metrics(metrics_data: DashboardMetricsDocument, db = Depends(get_db), current_user: str = Depends(verify_token)):
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
