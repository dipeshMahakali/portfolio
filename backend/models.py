# ... existing code ...

# Project Models
class ProjectMetric(BaseModel):
    label: str
    value: str

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    demo: Optional[str] = None
    featured: bool = False
    metrics: Optional[List[ProjectMetric]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github: str
    demo: Optional[str] = None
    featured: bool = False
    metrics: Optional[List[ProjectMetric]] = []

class ProjectResponse(Project):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# ... Work Experience Models ...

# Dashboard Metrics Models
class DashboardMetric(BaseModel):
    label: str
    value: str

class DashboardMetricsDocument(BaseModel):
    metrics: List[DashboardMetric]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Certification Models
class Certification(BaseModel):
    title: str
    issuer: str
    date: str
    credential_id: Optional[str] = None
    url: Optional[str] = None
    image: Optional[str] = None # For verified badge icon logic on frontend

class CertificationsDocument(BaseModel):
    certifications: List[Certification]
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
# ... Testimonials, Skills, Approach ...

# Contact Message Models
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
    projectType: Optional[str] = None
    read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str
    projectType: Optional[str] = None

class ContactMessageResponse(ContactMessage):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True

# ... Auth Models ...
class VerifyResponse(BaseModel):
    valid: bool
