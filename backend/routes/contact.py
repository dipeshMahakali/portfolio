from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import ContactMessage, ContactMessageCreate, ContactMessageResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/contact", tags=["Contact"])

async def get_db():
    from server import db
    return db

@router.post("")
async def submit_contact_message(
    message: ContactMessageCreate,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    message_dict = message.dict()
    message_dict["read"] = False
    message_dict["created_at"] = datetime.utcnow()
    
    await db.contact_messages.insert_one(message_dict)
    
    return {"message": "Your message has been sent successfully!"}

@router.get("", response_model=List[ContactMessageResponse])
async def get_contact_messages(
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
    for msg in messages:
        msg["_id"] = str(msg["_id"])
    return messages

@router.put("/{message_id}/read")
async def mark_message_as_read(
    message_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.contact_messages.find_one_and_update(
        {"_id": ObjectId(message_id)},
        {"$set": {"read": True}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message marked as read"}

@router.delete("/{message_id}")
async def delete_contact_message(
    message_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.contact_messages.delete_one({"_id": ObjectId(message_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Contact message deleted successfully"}
