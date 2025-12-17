from fastapi import APIRouter, HTTPException, Depends
from models import CertificationsDocument, Certification
from typing import List
from auth import get_current_user
from database import db
from datetime import datetime

router = APIRouter()

@router.get("/certifications", response_model=CertificationsDocument)
async def get_certifications():
    doc = await db.certifications.find_one({})
    if not doc:
        return {"certifications": [], "updated_at": datetime.utcnow()}
    return doc

@router.put("/certifications", response_model=CertificationsDocument)
async def update_certifications(cert_data: CertificationsDocument, current_user: str = Depends(get_current_user)):
    data = cert_data.dict()
    data["updated_at"] = datetime.utcnow()
    
    await db.certifications.update_one(
        {}, 
        {"$set": data}, 
        upsert=True
    )
    
    return data
