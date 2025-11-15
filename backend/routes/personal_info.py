from fastapi import APIRouter, HTTPException, Depends
from models import PersonalInfo, PersonalInfoResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime

router = APIRouter(prefix="/personal-info", tags=["Personal Info"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=PersonalInfoResponse)
async def get_personal_info(db: AsyncIOMotorDatabase = Depends(get_db)):
    personal_info = await db.personal_info.find_one()
    if not personal_info:
        raise HTTPException(status_code=404, detail="Personal info not found")
    
    personal_info["_id"] = str(personal_info["_id"])
    return personal_info

@router.put("", response_model=PersonalInfoResponse)
async def update_personal_info(
    info: PersonalInfo,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    info_dict = info.dict()
    info_dict["updated_at"] = datetime.utcnow()
    
    result = await db.personal_info.find_one_and_update(
        {},
        {"$set": info_dict},
        upsert=True,
        return_document=True
    )
    
    result["_id"] = str(result["_id"])
    return result
