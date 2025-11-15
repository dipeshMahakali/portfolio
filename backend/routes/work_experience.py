from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import WorkExperience, WorkExperienceCreate, WorkExperienceResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/work-experience", tags=["Work Experience"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=List[WorkExperienceResponse])
async def get_work_experience(db: AsyncIOMotorDatabase = Depends(get_db)):
    experiences = await db.work_experience.find().to_list(1000)
    for exp in experiences:
        exp["_id"] = str(exp["_id"])
    return experiences

@router.post("", response_model=WorkExperienceResponse)
async def create_work_experience(
    experience: WorkExperienceCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    exp_dict = experience.dict()
    exp_dict["created_at"] = datetime.utcnow()
    exp_dict["updated_at"] = datetime.utcnow()
    
    result = await db.work_experience.insert_one(exp_dict)
    exp_dict["_id"] = str(result.inserted_id)
    return exp_dict

@router.put("/{experience_id}", response_model=WorkExperienceResponse)
async def update_work_experience(
    experience_id: str,
    experience: WorkExperienceCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(experience_id):
        raise HTTPException(status_code=400, detail="Invalid experience ID")
    
    exp_dict = experience.dict()
    exp_dict["updated_at"] = datetime.utcnow()
    
    result = await db.work_experience.find_one_and_update(
        {"_id": ObjectId(experience_id)},
        {"$set": exp_dict},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Work experience not found")
    
    result["_id"] = str(result["_id"])
    return result

@router.delete("/{experience_id}")
async def delete_work_experience(
    experience_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(experience_id):
        raise HTTPException(status_code=400, detail="Invalid experience ID")
    
    result = await db.work_experience.delete_one({"_id": ObjectId(experience_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Work experience not found")
    
    return {"message": "Work experience deleted successfully"}
