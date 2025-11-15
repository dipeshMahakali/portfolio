from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Personal Info Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    description: str
    email: str
    phone: str
    location: str
    github: str
    linkedin: str
    twitter: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PersonalInfoResponse(PersonalInfo):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# Project Models
class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    featured: bool = False

class ProjectResponse(Project):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# Work Experience Models
class WorkExperience(BaseModel):
    title: str
    company: str
    period: str
    description: str
    technologies: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class WorkExperienceCreate(BaseModel):
    title: str
    company: str
    period: str
    description: str
    technologies: List[str]

class WorkExperienceResponse(WorkExperience):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# Testimonial Models
class Testimonial(BaseModel):
    name: str
    position: str
    company: str
    content: str
    rating: int = Field(ge=1, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    position: str
    company: str
    content: str
    rating: int = Field(ge=1, le=5)

class TestimonialResponse(Testimonial):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# Skills Models
class Skill(BaseModel):
    name: str
    level: int = Field(ge=0, le=100)

class SkillsDocument(BaseModel):
    skills: List[Skill]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Approach Models
class ApproachItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str

class ApproachDocument(BaseModel):
    items: List[ApproachItem]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Contact Message Models
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
    read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageResponse(ContactMessage):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# Auth Models
class LoginRequest(BaseModel):
    password: str

class LoginResponse(BaseModel):
    token: str
    expires_in: str = "24h"

class VerifyResponse(BaseModel):
    valid: bool
