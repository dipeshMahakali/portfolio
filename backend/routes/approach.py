from fastapi import APIRouter, HTTPException, Depends
from models import ApproachItem, ApproachDocument
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from datetime import datetime

router = APIRouter(prefix="/approach", tags=["Approach"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=List[ApproachItem])
async def get_approach(db: AsyncIOMotorDatabase = Depends(get_db)):
    approach_doc = await db.approach.find_one()
    if not approach_doc or "items" not in approach_doc:
        return []
    return approach_doc["items"]

@router.put("", response_model=List[ApproachItem])
async def update_approach(
    items: List[ApproachItem],
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    approach_dict = {
        "items": [item.dict() for item in items],
        "updated_at": datetime.utcnow()
    }
    
    await db.approach.find_one_and_update(
        {},
        {"$set": approach_dict},
        upsert=True
    )
    
    return items
