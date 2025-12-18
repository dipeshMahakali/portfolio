from fastapi import APIRouter, HTTPException, Depends
from models import CertificationsDocument, Certification
from typing import List
from auth import verify_token
from datetime import datetime

router = APIRouter()

async def get_db():
    from server import db
    return db

@router.get("/certifications", response_model=CertificationsDocument)
async def get_certifications(db = Depends(get_db)):
    doc = await db.certifications.find_one({})
    if not doc:
        return {"certifications": [], "updated_at": datetime.utcnow()}
    return doc

@router.put("/certifications", response_model=CertificationsDocument)
async def update_certifications(cert_data: CertificationsDocument, db = Depends(get_db), current_user: str = Depends(verify_token)):
    data = cert_data.dict()
    data["updated_at"] = datetime.utcnow()
    
    await db.certifications.update_one(
        {}, 
        {"$set": data}, 
        upsert=True
    )
    
    return data
