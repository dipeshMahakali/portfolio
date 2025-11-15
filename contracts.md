# API Contracts & Integration Plan

## Overview
This document outlines the API contracts between frontend and backend, data models, and integration strategy for the 3D Portfolio with Admin Panel.

---

## Frontend Mock Data Location
- **File**: `/app/frontend/src/data/mock.js`
- **Data Structures**: personalInfo, projects, workExperience, testimonials, skills, approach

---

## Backend API Endpoints

### 1. Personal Information APIs

#### GET /api/personal-info
**Response:**
```json
{
  "name": "string",
  "title": "string",
  "description": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "github": "string",
  "linkedin": "string",
  "twitter": "string"
}
```

#### PUT /api/personal-info
**Request Body:** Same as GET response
**Response:** Updated personal info object

---

### 2. Projects APIs

#### GET /api/projects
**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "technologies": ["string"],
    "github": "string",
    "featured": boolean
  }
]
```

#### POST /api/projects
**Request Body:** Project object without id
**Response:** Created project with id

#### PUT /api/projects/:id
**Request Body:** Updated project object
**Response:** Updated project

#### DELETE /api/projects/:id
**Response:** Success message

---

### 3. Work Experience APIs

#### GET /api/work-experience
**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "company": "string",
    "period": "string",
    "description": "string",
    "technologies": ["string"]
  }
]
```

#### POST /api/work-experience
**Request Body:** Work experience object without id
**Response:** Created work experience with id

#### PUT /api/work-experience/:id
**Request Body:** Updated work experience object
**Response:** Updated work experience

#### DELETE /api/work-experience/:id
**Response:** Success message

---

### 4. Testimonials APIs

#### GET /api/testimonials
**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "position": "string",
    "company": "string",
    "content": "string",
    "rating": number
  }
]
```

#### POST /api/testimonials
**Request Body:** Testimonial object without id
**Response:** Created testimonial with id

#### PUT /api/testimonials/:id
**Request Body:** Updated testimonial object
**Response:** Updated testimonial

#### DELETE /api/testimonials/:id
**Response:** Success message

---

### 5. Skills APIs

#### GET /api/skills
**Response:**
```json
[
  {
    "name": "string",
    "level": number
  }
]
```

#### PUT /api/skills
**Request Body:** Array of skills
**Response:** Updated skills array

---

### 6. Approach APIs

#### GET /api/approach
**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string"
  }
]
```

#### PUT /api/approach
**Request Body:** Array of approach items
**Response:** Updated approach array

---

### 7. Contact Form API

#### POST /api/contact
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```
**Response:** Success message

---

## MongoDB Collections

### 1. personal_info (Single Document)
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  description: String,
  email: String,
  phone: String,
  location: String,
  github: String,
  linkedin: String,
  twitter: String,
  updatedAt: Date
}
```

### 2. projects
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  github: String,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. work_experience
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  period: String,
  description: String,
  technologies: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. testimonials
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  company: String,
  content: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. skills (Single Document with Array)
```javascript
{
  _id: ObjectId,
  skills: [
    {
      name: String,
      level: Number
    }
  ],
  updatedAt: Date
}
```

### 6. approach (Single Document with Array)
```javascript
{
  _id: ObjectId,
  items: [
    {
      id: String,
      title: String,
      description: String
    }
  ],
  updatedAt: Date
}
```

### 7. contact_messages
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

---

## Frontend Integration Steps

### Step 1: Create API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = {
  // Personal Info
  getPersonalInfo: () => axios.get(`${API_BASE}/personal-info`),
  updatePersonalInfo: (data) => axios.put(`${API_BASE}/personal-info`, data),
  
  // Projects
  getProjects: () => axios.get(`${API_BASE}/projects`),
  createProject: (data) => axios.post(`${API_BASE}/projects`, data),
  updateProject: (id, data) => axios.put(`${API_BASE}/projects/${id}`, data),
  deleteProject: (id) => axios.delete(`${API_BASE}/projects/${id}`),
  
  // Similar methods for other resources...
};
```

### Step 2: Replace Mock Data in Components
- Update `App.js` to fetch data from API instead of importing mock.js
- Add loading states and error handling
- Keep mock.js as fallback for development

### Step 3: Admin Panel Routes
Add admin panel at `/admin` route with:
- Login page (simple password protection)
- Dashboard with sections for each data type
- CRUD forms for managing content

---

## Authentication Strategy (Simple)

For MVP, implement basic password protection:
- Single admin password stored in backend `.env`
- Login endpoint returns JWT token
- Protected routes require valid JWT

### Auth Endpoints

#### POST /api/auth/login
**Request:**
```json
{
  "password": "string"
}
```
**Response:**
```json
{
  "token": "jwt_token",
  "expiresIn": "24h"
}
```

#### GET /api/auth/verify
**Headers:** `Authorization: Bearer <token>`
**Response:** `{ valid: boolean }`

---

## Error Handling

All API endpoints should return consistent error format:
```json
{
  "error": "Error message",
  "details": "Optional detailed information"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

---

## Next Steps

1. **Backend Development**:
   - Create MongoDB models
   - Implement all API endpoints
   - Add authentication middleware
   - Seed database with current mock data

2. **Frontend Integration**:
   - Create API service layer
   - Replace mock imports with API calls
   - Add loading and error states
   - Build admin panel UI

3. **Testing**:
   - Test all CRUD operations
   - Test authentication flow
   - Test frontend error handling
   - Verify data persistence

---

## Notes

- All dates use ISO 8601 format
- MongoDB ObjectIds converted to strings in API responses
- Frontend maintains mock.js for development/fallback
- Admin panel will be password-protected (no user registration needed)
- Contact form messages stored in database for admin to review
