"""
Seed script to populate MongoDB with initial portfolio data
Run this script once to initialize the database with mock data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("🌱 Starting database seeding...")
    
    # Clear existing data
    await db.personal_info.delete_many({})
    await db.projects.delete_many({})
    await db.work_experience.delete_many({})
    await db.testimonials.delete_many({})
    await db.skills.delete_many({})
    await db.approach.delete_many({})
    await db.dashboard_metrics.delete_many({})
    await db.certifications.delete_many({})
    
    print("✓ Cleared existing data")
    
    # Seed Personal Info
    personal_info = {
        "name": "Dipesh Patel",
        "title": "Python Developer, AI and IOT Enthusiast",
        "description": "Passionate about building innovative solutions using Python, Artificial Intelligence, and Internet of Things technologies.",
        "email": "dipesh.patel1902@gmail.com",
        "phone": "8319821606",
        "location": "India",
        "github": "https://github.com/starkdipesh",
        "linkedin": "https://linkedin.com/in/dipeshpatel",
        "twitter": "https://twitter.com/dipeshpatel",
        "updated_at": datetime.utcnow()
    }
    await db.personal_info.insert_one(personal_info)
    print("✓ Seeded personal info")
    
    # Seed Projects
    projects = [
        {
            "title": "JIA Virtual Assistant",
            "description": "An intelligent virtual assistant built with Python, featuring voice recognition, natural language processing, and task automation capabilities.",
            "technologies": ["Python", "NLP", "Speech Recognition", "AI", "Automation", "Web Scraping"],
            "github": "https://github.com/starkdipesh/JIA-VIRTUAL-ASSISTANT",
            "demo": "https://github.com/starkdipesh/JIA-VIRTUAL-ASSISTANT",
            "featured": True,
            "metrics": [
                {"label": "Accuracy", "value": "92%"},
                {"label": "Response Time", "value": "<2s"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Python Mini Projects",
            "description": "A collection of innovative Python projects demonstrating various programming concepts, algorithms, and practical applications.",
            "technologies": ["Python", "Automation", "Web Scraping", "APIs"],
            "github": "https://github.com/starkdipesh/pythonMiniProjects",
            "demo": "https://github.com/starkdipesh/pythonMiniProjects",
            "featured": True,
            "metrics": [
                {"label": "Projects", "value": "15+"},
                {"label": "Stars", "value": "⭐"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Data Science Portfolio",
            "description": "Comprehensive data science projects covering machine learning, data analysis, visualization, and predictive modeling.",
            "technologies": ["Python", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
            "github": "https://github.com/starkdipesh/Data-Science",
            "demo": "https://github.com/starkdipesh/Data-Science",
            "featured": True,
            "metrics": [
                {"label": "Model Accuracy", "value": "94%"},
                {"label": "Datasets", "value": "10+"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    await db.projects.insert_many(projects)
    print("✓ Seeded projects")
    
    # Seed Work Experience
    # ... (Keep existing work experience seeding if unchanged, or update if needed. Assuming unchanged based on previous mock.js)
    work_experience = [
        {
            "title": "Web Development Training",
            "company": "Shree Mahakali Software Pvt Ltd.",
            "period": "Jun 2025 - Dec 2025",
            "description": "Completed comprehensive web development training covering frontend and backend technologies, database management, and modern development practices.",
            "technologies": ["HTML", "CSS", "JavaScript", "Python", "Django", "Database Management", "Laravel", "Jquery", "GitLab"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Data Analysis Internship",
            "company": "Deloite Virtual Internship",
            "period": "May 2025",
            "description": "Analyzed and visualized manufacturing telemetry data using Python, Excel, and Tableau during the Deloitte Data Analytics Virtual Internship to drive operational efficiency and inform business strategy.",
            "technologies": ["Data Cleaning","Data Preprocessing", "Statistical Analysis", "Data Visualization", "Excel", "Python", "Pandas", "NumPy"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    await db.work_experience.insert_many(work_experience)
    print("✓ Seeded work experience")
    
    # Seed Testimonials
    testimonials = [
        {
            "name": "Rahul Sharma",
            "position": "Senior Python Developer",
            "company": "Tech Solutions Inc.",
            "content": "Dipesh demonstrates exceptional problem-solving skills and a deep understanding of Python development. His AI projects showcase creativity and technical excellence.",
            "rating": 5,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Priya Patel",
            "position": "IoT Project Lead",
            "company": "Innovation Labs",
            "content": "Working with Dipesh on IoT projects has been fantastic. His ability to integrate hardware and software solutions is impressive, and his dedication to learning is inspiring.",
            "rating": 5,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Amit Kumar",
            "position": "Data Science Manager",
            "company": "Analytics Pro",
            "content": "Dipesh's data science portfolio reflects strong analytical thinking and proficiency in Python libraries. His approach to machine learning problems is methodical and innovative.",
            "rating": 5,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Neha Gupta",
            "position": "Software Architect",
            "company": "Digital Innovations",
            "content": "The virtual assistant project by Dipesh shows remarkable understanding of NLP and AI concepts. His code quality and documentation are commendable.",
            "rating": 5,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    await db.testimonials.insert_many(testimonials)
    print("✓ Seeded testimonials")
    
    # Seed Skills
    skills = {
        "skills": [
            {"name": "Python", "level": 90},
            {"name": "Machine Learning", "level": 85},
            {"name": "IoT Development", "level": 80},
            {"name": "Data Science", "level": 85},
            {"name": "Natural Language Processing", "level": 75},
            {"name": "Web Development", "level": 80},
            {"name": "Automation", "level": 85},
            {"name": "Database Management", "level": 75}
        ],
        "updated_at": datetime.utcnow()
    }
    await db.skills.insert_one(skills)
    print("✓ Seeded skills")
    
    # Seed Approach
    approach = {
        "items": [
            {
                "id": "1",
                "title": "Problem Analysis",
                "description": "Deep dive into understanding the problem, requirements, and constraints before jumping to solutions."
            },
            {
                "id": "2",
                "title": "Research & Planning",
                "description": "Thorough research of existing solutions, technologies, and best practices to design optimal architecture."
            },
            {
                "id": "3",
                "title": "Iterative Development",
                "description": "Building solutions incrementally with continuous testing and feedback integration."
            },
            {
                "id": "4",
                "title": "Quality Assurance",
                "description": "Rigorous testing, code reviews, and documentation to ensure reliability and maintainability."
            }
        ],
        "updated_at": datetime.utcnow()
    }
    await db.approach.insert_one(approach)
    print("✓ Seeded approach")
    
    # Seed Dashboard Metrics
    dashboard_metrics = {
        "metrics": [
            {"label": "AI Models Deployed", "value": "25", "iconName": "Brain", "suffix": "+", "color": "from-purple-500 to-pink-500", "bgColor": "bg-purple-500/10", "borderColor": "border-purple-500/30"},
            {"label": "IoT Devices Connected", "value": "500", "iconName": "Cpu", "suffix": "+", "color": "from-cyan-500 to-blue-500", "bgColor": "bg-cyan-500/10", "borderColor": "border-cyan-500/30"},
            {"label": "Data Processed", "value": "100", "iconName": "Database", "suffix": "TB+", "color": "from-green-500 to-emerald-500", "bgColor": "bg-green-500/10", "borderColor": "border-green-500/30"},
            {"label": "API Requests Served", "value": "1", "iconName": "Zap", "suffix": "M+", "color": "from-yellow-500 to-orange-500", "bgColor": "bg-yellow-500/10", "borderColor": "border-yellow-500/30"},
            {"label": "Model Accuracy", "value": "95", "iconName": "Trophy", "suffix": "%+", "color": "from-amber-500 to-red-500", "bgColor": "bg-amber-500/10", "borderColor": "border-amber-500/30"},
            {"label": "Projects Completed", "value": "30", "iconName": "Code", "suffix": "+", "color": "from-blue-500 to-indigo-500", "bgColor": "bg-blue-500/10", "borderColor": "border-blue-500/30"},
            {"label": "GitHub Repositories", "value": "50", "iconName": "GitBranch", "suffix": "+", "color": "from-slate-500 to-gray-500", "bgColor": "bg-slate-500/10", "borderColor": "border-slate-500/30"},
            {"label": "Satisfied Clients", "value": "15", "iconName": "Users", "suffix": "+", "color": "from-pink-500 to-rose-500", "bgColor": "bg-pink-500/10", "borderColor": "border-pink-500/30"}
        ],
        "updated_at": datetime.utcnow()
    }
    await db.dashboard_metrics.insert_one(dashboard_metrics)
    print("✓ Seeded dashboard metrics")
    
    # Seed Certifications
    certifications = {
        "certifications": [
            {
                "title": "AWS Certified Machine Learning - Specialty",
                "issuer": "Amazon Web Services",
                "date": "2024",
                "credential_id": "AWS-ML-12345",
                "logo": "☁️",
                "description": "Advanced ML model development and deployment on AWS",
                "verified": True,
                "color": "from-orange-500 to-yellow-500",
                "url": "#"
            },
            {
                "title": "TensorFlow Developer Certificate",
                "issuer": "Google",
                "date": "2023",
                "credential_id": "TF-DEV-67890",
                "logo": "🧠",
                "description": "Deep learning and neural network implementation",
                "verified": True,
                "color": "from-orange-600 to-red-600",
                "url": "#"
            },
            {
                "title": "IoT Specialization",
                "issuer": "Coursera",
                "date": "2023",
                "credential_id": "IOT-SPEC-54321",
                "logo": "📡",
                "description": "End-to-end IoT system design and implementation",
                "verified": True,
                "color": "from-cyan-500 to-blue-500",
                "url": "#"
            },
            {
                "title": "Deep Learning Specialization",
                "issuer": "DeepLearning.AI",
                "date": "2022",
                "credential_id": "DL-SPEC-98765",
                "logo": "🎓",
                "description": "Advanced neural networks and deep learning techniques",
                "verified": True,
                "color": "from-purple-500 to-pink-500",
                "url": "#"
            }
        ],
        "updated_at": datetime.utcnow()
    }
    await db.certifications.insert_one(certifications)
    print("✓ Seeded certifications")
    
    print("\n✅ Database seeding completed successfully!")
    print("\n📊 Summary:")
    print("   - Personal Info: 1 document")
    print("   - Projects: 3 documents")
    print("   - Work Experience: 2 documents")
    print("   - Testimonials: 4 documents")
    print("   - Skills: 8 skills")
    print("   - Approach: 4 items")
    print("   - Dashboard Metrics: 8 metrics")
    print("   - Certifications: 4 certifications")

if __name__ == "__main__":
    asyncio.run(seed_database())
