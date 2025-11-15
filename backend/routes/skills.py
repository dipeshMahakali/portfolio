from fastapi import APIRouter, HTTPException, Depends
from models import Skill, SkillsDocument
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from datetime import datetime

router = APIRouter(prefix="/skills", tags=["Skills"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=List[Skill])
async def get_skills(db: AsyncIOMotorDatabase = Depends(get_db)):
    skills_doc = await db.skills.find_one()
    if not skills_doc or "skills" not in skills_doc:
        return []
    return skills_doc["skills"]

@router.put("", response_model=List[Skill])
async def update_skills(
    skills: List[Skill],
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    skills_dict = {
        "skills": [skill.dict() for skill in skills],
        "updated_at": datetime.utcnow()
    }
    
    await db.skills.find_one_and_update(
        {},
        {"$set": skills_dict},
        upsert=True
    )
    
    return skills
