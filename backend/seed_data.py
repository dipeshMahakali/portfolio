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
    
    print("✓ Cleared existing data")
    
    # Seed Personal Info
    personal_info = {
        "name": "Dipesh Patel",
        "title": "Python Developer, AI and IOT Enthusiast",
        "description": "Passionate about building innovative solutions using Python, Artificial Intelligence, and Internet of Things technologies.",
        "email": "dipesh.patel19022@gmail.com",
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
            "technologies": ["Python", "NLP", "Speech Recognition", "AI"],
            "github": "https://github.com/starkdipesh/JIA-VIRTUAL-ASSISTANT",
            "featured": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Python Mini Projects",
            "description": "A collection of innovative Python projects demonstrating various programming concepts, algorithms, and practical applications.",
            "technologies": ["Python", "Automation", "Web Scraping", "APIs"],
            "github": "https://github.com/starkdipesh/pythonMiniProjects",
            "featured": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Data Science Portfolio",
            "description": "Comprehensive data science projects covering machine learning, data analysis, visualization, and predictive modeling.",
            "technologies": ["Python", "Pandas", "NumPy", "Machine Learning"],
            "github": "https://github.com/starkdipesh/Data-Science",
            "featured": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    await db.projects.insert_many(projects)
    print("✓ Seeded projects")
    
    # Seed Work Experience
    work_experience = [
        {
            "title": "Web Development Training",
            "company": "Shree Mahakali Software",
            "period": "2023",
            "description": "Completed comprehensive web development training covering frontend and backend technologies, database management, and modern development practices.",
            "technologies": ["HTML", "CSS", "JavaScript", "Python", "Database Management"],
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
    
    print("\n✅ Database seeding completed successfully!")
    print("\n📊 Summary:")
    print("   - Personal Info: 1 document")
    print("   - Projects: 3 documents")
    print("   - Work Experience: 1 document")
    print("   - Testimonials: 4 documents")
    print("   - Skills: 8 skills")
    print("   - Approach: 4 items")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
