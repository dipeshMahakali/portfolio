from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import Project, ProjectCreate, ProjectResponse
from auth import verify_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/projects", tags=["Projects"])

async def get_db():
    from server import db
    return db

@router.get("", response_model=List[ProjectResponse])
async def get_projects(db: AsyncIOMotorDatabase = Depends(get_db)):
    projects = await db.projects.find().to_list(1000)
    for project in projects:
        project["_id"] = str(project["_id"])
    return projects

@router.post("", response_model=ProjectResponse)
async def create_project(
    project: ProjectCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    project_dict = project.dict()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_dict)
    project_dict["_id"] = str(result.inserted_id)
    return project_dict

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project: ProjectCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    project_dict = project.dict()
    project_dict["updated_at"] = datetime.utcnow()
    
    result = await db.projects.find_one_and_update(
        {"_id": ObjectId(project_id)},
        {"$set": project_dict},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Project not found")
    
    result["_id"] = str(result["_id"])
    return result

@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    _: dict = Depends(verify_token)
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"message": "Project deleted successfully"}
