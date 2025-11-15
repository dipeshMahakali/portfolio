from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import Testimonial, TestimonialCreate, TestimonialResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=List[TestimonialResponse])
async def get_testimonials(db: AsyncIOMotorDatabase = Depends(get_db)):
    testimonials = await db.testimonials.find().to_list(1000)
    for testimonial in testimonials:
        testimonial["_id"] = str(testimonial["_id"])
    return testimonials

@router.post("", response_model=TestimonialResponse)
async def create_testimonial(
    testimonial: TestimonialCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    testimonial_dict = testimonial.dict()
    testimonial_dict["created_at"] = datetime.utcnow()
    testimonial_dict["updated_at"] = datetime.utcnow()
    
    result = await db.testimonials.insert_one(testimonial_dict)
    testimonial_dict["_id"] = str(result.inserted_id)
    return testimonial_dict

@router.put("/{testimonial_id}", response_model=TestimonialResponse)
async def update_testimonial(
    testimonial_id: str,
    testimonial: TestimonialCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(testimonial_id):
        raise HTTPException(status_code=400, detail="Invalid testimonial ID")
    
    testimonial_dict = testimonial.dict()
    testimonial_dict["updated_at"] = datetime.utcnow()
    
    result = await db.testimonials.find_one_and_update(
        {"_id": ObjectId(testimonial_id)},
        {"$set": testimonial_dict},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    result["_id"] = str(result["_id"])
    return result

@router.delete("/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(testimonial_id):
        raise HTTPException(status_code=400, detail="Invalid testimonial ID")
    
    result = await db.testimonials.delete_one({"_id": ObjectId(testimonial_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return {"message": "Testimonial deleted successfully"}
