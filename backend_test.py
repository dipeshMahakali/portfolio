#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for 3D Portfolio Application
Tests all endpoints with authentication flow and CRUD operations
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BASE_URL = "https://fullstack-fixer-8.preview.emergentagent.com/api"
ADMIN_PASSWORD = "admin123"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response"] = response_data
        
        self.test_results.append(result)
        if not success:
            self.failed_tests.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
    def make_request(self, method, endpoint, data=None, headers=None, auth_required=False):
        """Make HTTP request with optional authentication"""
        url = f"{self.base_url}{endpoint}"
        
        if headers is None:
            headers = {"Content-Type": "application/json"}
        
        if auth_required and self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        
        try:
            if method == "GET":
                response = requests.get(url, headers=headers, timeout=30)
            elif method == "POST":
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == "PUT":
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request exception for {method} {url}: {e}")
            return None
    
    def test_health_check(self):
        """Test GET /api/ endpoint"""
        response = self.make_request("GET", "/")
        
        if response and response.status_code == 200:
            data = response.json()
            if "message" in data and "status" in data:
                self.log_test("Health Check", True, f"API is healthy: {data['message']}")
                return True
            else:
                self.log_test("Health Check", False, "Invalid response format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Health Check", False, f"Failed with status: {status}")
        return False
    
    def test_authentication_flow(self):
        """Test authentication endpoints"""
        # Test login with correct password
        login_data = {"password": ADMIN_PASSWORD}
        response = self.make_request("POST", "/auth/login", login_data)
        
        if response and response.status_code == 200:
            data = response.json()
            if "token" in data:
                self.token = data["token"]
                self.log_test("Login - Correct Password", True, "Successfully authenticated")
            else:
                self.log_test("Login - Correct Password", False, "No token in response")
                return False
        else:
            status = response.status_code if response else "No response"
            self.log_test("Login - Correct Password", False, f"Failed with status: {status}")
            return False
        
        # Test login with incorrect password
        wrong_login_data = {"password": "wrongpassword"}
        response = self.make_request("POST", "/auth/login", wrong_login_data)
        
        if response and response.status_code == 401:
            self.log_test("Login - Wrong Password", True, "Correctly rejected invalid password")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Login - Wrong Password", False, f"Expected 401, got: {status}")
        
        # Test token verification with valid token
        response = self.make_request("GET", "/auth/verify", auth_required=True)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("valid") is True:
                self.log_test("Token Verification - Valid", True, "Token verified successfully")
            else:
                self.log_test("Token Verification - Valid", False, "Token not marked as valid")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Token Verification - Valid", False, f"Failed with status: {status}")
        
        # Test token verification without token
        response = self.make_request("GET", "/auth/verify")
        
        if response and response.status_code == 403:
            self.log_test("Token Verification - No Token", True, "Correctly rejected request without token")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Token Verification - No Token", False, f"Expected 403, got: {status}")
        
        return self.token is not None
    
    def test_personal_info_api(self):
        """Test personal info endpoints"""
        # Test GET personal info (public)
        response = self.make_request("GET", "/personal-info")
        
        if response and response.status_code == 200:
            data = response.json()
            if "name" in data and "title" in data:
                self.log_test("Get Personal Info", True, f"Retrieved personal info for: {data.get('name', 'Unknown')}")
            else:
                self.log_test("Get Personal Info", False, "Invalid personal info format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Personal Info", False, f"Failed with status: {status}")
        
        # Test PUT personal info with auth
        update_data = {
            "name": "John Doe Updated",
            "title": "Senior Full Stack Developer",
            "description": "Updated description",
            "email": "john.updated@example.com",
            "phone": "+1-555-0123",
            "location": "San Francisco, CA",
            "github": "https://github.com/johndoe",
            "linkedin": "https://linkedin.com/in/johndoe",
            "twitter": "https://twitter.com/johndoe"
        }
        
        response = self.make_request("PUT", "/personal-info", update_data, auth_required=True)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("name") == update_data["name"]:
                self.log_test("Update Personal Info - With Auth", True, "Successfully updated personal info")
            else:
                self.log_test("Update Personal Info - With Auth", False, "Data not updated correctly")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Update Personal Info - With Auth", False, f"Failed with status: {status}")
        
        # Test PUT personal info without auth
        response = self.make_request("PUT", "/personal-info", update_data)
        
        if response and response.status_code == 403:
            self.log_test("Update Personal Info - No Auth", True, "Correctly rejected unauthorized request")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Update Personal Info - No Auth", False, f"Expected 403, got: {status}")
    
    def test_projects_crud(self):
        """Test projects CRUD operations"""
        # Test GET projects (public)
        response = self.make_request("GET", "/projects")
        
        if response and response.status_code == 200:
            projects = response.json()
            if isinstance(projects, list):
                self.log_test("Get Projects", True, f"Retrieved {len(projects)} projects")
                project_count = len(projects)
            else:
                self.log_test("Get Projects", False, "Invalid projects format")
                return
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Projects", False, f"Failed with status: {status}")
            return
        
        # Test POST project with auth
        new_project = {
            "title": "Test Project API",
            "description": "A test project created via API testing",
            "technologies": ["Python", "FastAPI", "MongoDB"],
            "github": "https://github.com/test/project",
            "featured": True
        }
        
        response = self.make_request("POST", "/projects", new_project, auth_required=True)
        created_project_id = None
        
        if response and response.status_code == 200:
            data = response.json()
            if "_id" in data and data.get("title") == new_project["title"]:
                created_project_id = data["_id"]
                self.log_test("Create Project - With Auth", True, f"Successfully created project: {data['title']}")
            else:
                self.log_test("Create Project - With Auth", False, "Invalid response format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Create Project - With Auth", False, f"Failed with status: {status}")
        
        # Test PUT project with auth (if we have a project to update)
        if created_project_id:
            update_project = {
                "title": "Updated Test Project API",
                "description": "Updated description",
                "technologies": ["Python", "FastAPI", "MongoDB", "React"],
                "github": "https://github.com/test/updated-project",
                "featured": False
            }
            
            response = self.make_request("PUT", f"/projects/{created_project_id}", update_project, auth_required=True)
            
            if response and response.status_code == 200:
                data = response.json()
                if data.get("title") == update_project["title"]:
                    self.log_test("Update Project - With Auth", True, "Successfully updated project")
                else:
                    self.log_test("Update Project - With Auth", False, "Project not updated correctly")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Update Project - With Auth", False, f"Failed with status: {status}")
        
        # Test POST project without auth
        response = self.make_request("POST", "/projects", new_project)
        
        if response and response.status_code == 403:
            self.log_test("Create Project - No Auth", True, "Correctly rejected unauthorized request")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Create Project - No Auth", False, f"Expected 403, got: {status}")
        
        # Test DELETE project with auth (if we have a project to delete)
        if created_project_id:
            response = self.make_request("DELETE", f"/projects/{created_project_id}", auth_required=True)
            
            if response and response.status_code == 200:
                self.log_test("Delete Project - With Auth", True, "Successfully deleted project")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Delete Project - With Auth", False, f"Failed with status: {status}")
    
    def test_work_experience_crud(self):
        """Test work experience CRUD operations"""
        # Test GET work experience (public)
        response = self.make_request("GET", "/work-experience")
        
        if response and response.status_code == 200:
            experiences = response.json()
            if isinstance(experiences, list):
                self.log_test("Get Work Experience", True, f"Retrieved {len(experiences)} work experiences")
            else:
                self.log_test("Get Work Experience", False, "Invalid work experience format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Work Experience", False, f"Failed with status: {status}")
        
        # Test POST work experience with auth
        new_experience = {
            "title": "Senior Software Engineer",
            "company": "Test Company Inc",
            "period": "2023 - Present",
            "description": "Leading development of scalable web applications",
            "technologies": ["Python", "React", "AWS"]
        }
        
        response = self.make_request("POST", "/work-experience", new_experience, auth_required=True)
        created_exp_id = None
        
        if response and response.status_code == 200:
            data = response.json()
            if "_id" in data and data.get("title") == new_experience["title"]:
                created_exp_id = data["_id"]
                self.log_test("Create Work Experience - With Auth", True, f"Successfully created experience: {data['title']}")
            else:
                self.log_test("Create Work Experience - With Auth", False, "Invalid response format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Create Work Experience - With Auth", False, f"Failed with status: {status}")
        
        # Test PUT work experience with auth
        if created_exp_id:
            update_experience = {
                "title": "Lead Software Engineer",
                "company": "Test Company Inc",
                "period": "2023 - Present",
                "description": "Updated: Leading development and mentoring team",
                "technologies": ["Python", "React", "AWS", "Docker"]
            }
            
            response = self.make_request("PUT", f"/work-experience/{created_exp_id}", update_experience, auth_required=True)
            
            if response and response.status_code == 200:
                data = response.json()
                if data.get("title") == update_experience["title"]:
                    self.log_test("Update Work Experience - With Auth", True, "Successfully updated work experience")
                else:
                    self.log_test("Update Work Experience - With Auth", False, "Work experience not updated correctly")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Update Work Experience - With Auth", False, f"Failed with status: {status}")
        
        # Test DELETE work experience with auth
        if created_exp_id:
            response = self.make_request("DELETE", f"/work-experience/{created_exp_id}", auth_required=True)
            
            if response and response.status_code == 200:
                self.log_test("Delete Work Experience - With Auth", True, "Successfully deleted work experience")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Delete Work Experience - With Auth", False, f"Failed with status: {status}")
    
    def test_testimonials_crud(self):
        """Test testimonials CRUD operations"""
        # Test GET testimonials (public)
        response = self.make_request("GET", "/testimonials")
        
        if response and response.status_code == 200:
            testimonials = response.json()
            if isinstance(testimonials, list):
                self.log_test("Get Testimonials", True, f"Retrieved {len(testimonials)} testimonials")
            else:
                self.log_test("Get Testimonials", False, "Invalid testimonials format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Testimonials", False, f"Failed with status: {status}")
        
        # Test POST testimonial with auth
        new_testimonial = {
            "name": "Jane Smith",
            "position": "Product Manager",
            "company": "Tech Solutions Ltd",
            "content": "Excellent work on our project. Highly recommended!",
            "rating": 5
        }
        
        response = self.make_request("POST", "/testimonials", new_testimonial, auth_required=True)
        created_testimonial_id = None
        
        if response and response.status_code == 200:
            data = response.json()
            if "_id" in data and data.get("name") == new_testimonial["name"]:
                created_testimonial_id = data["_id"]
                self.log_test("Create Testimonial - With Auth", True, f"Successfully created testimonial from: {data['name']}")
            else:
                self.log_test("Create Testimonial - With Auth", False, "Invalid response format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Create Testimonial - With Auth", False, f"Failed with status: {status}")
        
        # Test PUT testimonial with auth
        if created_testimonial_id:
            update_testimonial = {
                "name": "Jane Smith",
                "position": "Senior Product Manager",
                "company": "Tech Solutions Ltd",
                "content": "Updated: Outstanding work and great communication throughout the project!",
                "rating": 5
            }
            
            response = self.make_request("PUT", f"/testimonials/{created_testimonial_id}", update_testimonial, auth_required=True)
            
            if response and response.status_code == 200:
                data = response.json()
                if data.get("position") == update_testimonial["position"]:
                    self.log_test("Update Testimonial - With Auth", True, "Successfully updated testimonial")
                else:
                    self.log_test("Update Testimonial - With Auth", False, "Testimonial not updated correctly")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Update Testimonial - With Auth", False, f"Failed with status: {status}")
        
        # Test DELETE testimonial with auth
        if created_testimonial_id:
            response = self.make_request("DELETE", f"/testimonials/{created_testimonial_id}", auth_required=True)
            
            if response and response.status_code == 200:
                self.log_test("Delete Testimonial - With Auth", True, "Successfully deleted testimonial")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Delete Testimonial - With Auth", False, f"Failed with status: {status}")
    
    def test_skills_api(self):
        """Test skills endpoints"""
        # Test GET skills (public)
        response = self.make_request("GET", "/skills")
        
        if response and response.status_code == 200:
            skills = response.json()
            if isinstance(skills, list):
                self.log_test("Get Skills", True, f"Retrieved {len(skills)} skills")
            else:
                self.log_test("Get Skills", False, "Invalid skills format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Skills", False, f"Failed with status: {status}")
        
        # Test PUT skills with auth
        update_skills = [
            {"name": "Python", "level": 95},
            {"name": "JavaScript", "level": 90},
            {"name": "React", "level": 85},
            {"name": "FastAPI", "level": 88},
            {"name": "MongoDB", "level": 80},
            {"name": "Docker", "level": 75},
            {"name": "AWS", "level": 70},
            {"name": "Machine Learning", "level": 65}
        ]
        
        response = self.make_request("PUT", "/skills", update_skills, auth_required=True)
        
        if response and response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) == len(update_skills):
                self.log_test("Update Skills - With Auth", True, f"Successfully updated {len(data)} skills")
            else:
                self.log_test("Update Skills - With Auth", False, "Skills not updated correctly")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Update Skills - With Auth", False, f"Failed with status: {status}")
    
    def test_approach_api(self):
        """Test approach endpoints"""
        # Test GET approach (public)
        response = self.make_request("GET", "/approach")
        
        if response and response.status_code == 200:
            approach = response.json()
            if isinstance(approach, list):
                self.log_test("Get Approach", True, f"Retrieved {len(approach)} approach items")
            else:
                self.log_test("Get Approach", False, "Invalid approach format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Approach", False, f"Failed with status: {status}")
        
        # Test PUT approach with auth
        update_approach = [
            {
                "id": "1",
                "title": "Discovery & Planning",
                "description": "Understanding requirements and creating detailed project roadmap"
            },
            {
                "id": "2", 
                "title": "Design & Architecture",
                "description": "Creating scalable system design and user-friendly interfaces"
            },
            {
                "id": "3",
                "title": "Development & Testing",
                "description": "Agile development with comprehensive testing and quality assurance"
            },
            {
                "id": "4",
                "title": "Deployment & Maintenance",
                "description": "Seamless deployment and ongoing support for optimal performance"
            }
        ]
        
        response = self.make_request("PUT", "/approach", update_approach, auth_required=True)
        
        if response and response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) == len(update_approach):
                self.log_test("Update Approach - With Auth", True, f"Successfully updated {len(data)} approach items")
            else:
                self.log_test("Update Approach - With Auth", False, "Approach not updated correctly")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Update Approach - With Auth", False, f"Failed with status: {status}")
    
    def test_contact_messages(self):
        """Test contact messages endpoints"""
        # Test POST contact (public endpoint)
        contact_message = {
            "name": "Test User",
            "email": "testuser@example.com",
            "message": "This is a test message from the API testing suite."
        }
        
        response = self.make_request("POST", "/contact", contact_message)
        
        if response and response.status_code == 200:
            data = response.json()
            if "message" in data:
                self.log_test("Submit Contact Message", True, "Successfully submitted contact message")
            else:
                self.log_test("Submit Contact Message", False, "Invalid response format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Submit Contact Message", False, f"Failed with status: {status}")
        
        # Test GET contact messages with auth (admin only)
        response = self.make_request("GET", "/contact", auth_required=True)
        contact_message_id = None
        
        if response and response.status_code == 200:
            messages = response.json()
            if isinstance(messages, list):
                self.log_test("Get Contact Messages - With Auth", True, f"Retrieved {len(messages)} contact messages")
                if messages:
                    contact_message_id = messages[0].get("id")
            else:
                self.log_test("Get Contact Messages - With Auth", False, "Invalid messages format")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Contact Messages - With Auth", False, f"Failed with status: {status}")
        
        # Test PUT contact message read status with auth
        if contact_message_id:
            response = self.make_request("PUT", f"/contact/{contact_message_id}/read", auth_required=True)
            
            if response and response.status_code == 200:
                self.log_test("Mark Message as Read - With Auth", True, "Successfully marked message as read")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Mark Message as Read - With Auth", False, f"Failed with status: {status}")
        
        # Test DELETE contact message with auth
        if contact_message_id:
            response = self.make_request("DELETE", f"/contact/{contact_message_id}", auth_required=True)
            
            if response and response.status_code == 200:
                self.log_test("Delete Contact Message - With Auth", True, "Successfully deleted contact message")
            else:
                status = response.status_code if response else "No response"
                self.log_test("Delete Contact Message - With Auth", False, f"Failed with status: {status}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting comprehensive API testing for: {self.base_url}")
        print("=" * 80)
        
        # Test health check first
        if not self.test_health_check():
            print("❌ Health check failed - aborting tests")
            return False
        
        # Test authentication flow
        if not self.test_authentication_flow():
            print("❌ Authentication failed - aborting authenticated tests")
            return False
        
        # Test all endpoints
        self.test_personal_info_api()
        self.test_projects_crud()
        self.test_work_experience_crud()
        self.test_testimonials_crud()
        self.test_skills_api()
        self.test_approach_api()
        self.test_contact_messages()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        return len(self.failed_tests) == 0

def main():
    """Main function to run tests"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed successfully!")
        sys.exit(0)
    else:
        print(f"\n💥 {len(tester.failed_tests)} tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()