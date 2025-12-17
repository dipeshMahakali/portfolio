# Backend Data Management Guide 🛠️

This guide explains how to manage your portfolio data specifically from the backend, including the new features for **Metrics**, **Certifications**, and **Projects**.

## 🚀 Accessing the Admin Panel

You can manage all your data specific to you via the built-in Admin Dashboard.

1.  Navigate to **/admin** (e.g., `http://localhost:3000/admin`)
2.  Login with your admin password (Default: `admin123` or check `.env`)

## 📊 Managing Content

### 1. **Projects** (Updated)
   - Now supports **Demo URLs** ("Live Demo" button)
   - Now supports **Metrics** display
   - Go to **Projects** section in Admin Dashboard

### 2. **Dashboard Metrics** (New) 📈
   - Go to the **Dashboard Metrics** card in Admin Dashboard
   - Update values for "AI Models Deployed", "IoT Devices", etc.
   - Changes reflect immediately on the Hero/Metrics section

### 3. **Certifications** (New) 🎓
   - Go to the **Certifications** card in Admin Dashboard
   - Add new certifications with:
     - Title
     - Issuer
     - Date
     - Credential ID
     - Description

### 4. **Other Sections**
   - Personal Info (Name, Links, Bio)
   - Work Experience
   - Testimonials
   - Skills
   - Approach
   - Contact Messages

## 🔄 Resetting / Seeding Data

If you want to reset the database to a clean state with the default data structure, run the seed script:

```bash
cd backend
python seed_data.py
```

This will populate:
- All new Metrics
- All new Certifications
- Enhanced Projects with metrics and demo links

## 🛠️ Technical Details

### Backend Structure
- **Models**: `backend/models.py` (Updated with new schemas)
- **Routes**:
  - `backend/routes/metrics.py` (New)
  - `backend/routes/certifications.py` (New)
  - `backend/routes/projects.py` (Updated)

### Frontend Integration
- **API Service**: `frontend/src/services/api.js` (Updated methods)
- **State Management**: `frontend/src/App.js` (Fetches all dynamic data)

## ✅ Verification
1.  Run the seed script first to ensure all collections exist.
2.  Login to Admin Panel.
3.  Edit a metric (e.g., change "AI Models Deployed" to 30).
4.  Check the homepage to see the change.
