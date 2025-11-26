import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, MessageSquare, Star, Code, Target, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import api from '../services/api';
import PersonalInfoManager from '../components/admin/PersonalInfoManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import WorkExperienceManager from '../components/admin/WorkExperienceManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import SkillsManager from '../components/admin/SkillsManager';
import ApproachManager from '../components/admin/ApproachManager';
import ContactMessagesManager from '../components/admin/ContactMessagesManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    projects: 0,
    workExperience: 0,
    testimonials: 0,
    messages: 0
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.auth.verify();
        fetchStats();
      } catch (error) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin panel.",
          variant: "destructive"
        });
        navigate('/admin');
      }
    };

    verifyAuth();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const [projects, workExp, testimonials, messages] = await Promise.all([
        api.projects.getAll(),
        api.workExperience.getAll(),
        api.testimonials.getAll(),
        api.contact.getAll()
      ]);

      setStats({
        projects: projects.data.length,
        workExperience: workExp.data.length,
        testimonials: testimonials.data.length,
        messages: messages.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personal-info':
        return <PersonalInfoManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'work-experience':
        return <WorkExperienceManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'approach':
        return <ApproachManager />;
      case 'messages':
        return <ContactMessagesManager />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-400">Manage your portfolio content from here</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <Card className="p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Projects</p>
              <p className="text-3xl font-bold text-white">{stats.projects}</p>
            </div>
            <Code className="w-12 h-12 text-cyan-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Work Experience</p>
              <p className="text-3xl font-bold text-white">{stats.workExperience}</p>
            </div>
            <Briefcase className="w-12 h-12 text-purple-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Testimonials</p>
              <p className="text-3xl font-bold text-white">{stats.testimonials}</p>
            </div>
            <Star className="w-12 h-12 text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Messages</p>
              <p className="text-3xl font-bold text-white">{stats.messages}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-orange-400" />
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card 
          onClick={() => setActiveSection('personal-info')}
          className="p-6 sm:p-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
        >
          <User className="w-12 h-12 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Personal Info</h3>
          <p className="text-gray-400 mb-4 text-sm">Update your profile information and contact details</p>
          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('projects')}
          className="p-6 sm:p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
        >
          <Code className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Projects</h3>
          <p className="text-gray-400 mb-4 text-sm">Add, edit, or remove your project portfolio</p>
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('work-experience')}
          className="p-6 sm:p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20 hover:border-green-500/40 transition-all duration-300 cursor-pointer"
        >
          <Briefcase className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Work Experience</h3>
          <p className="text-gray-400 mb-4 text-sm">Manage your professional experience timeline</p>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('testimonials')}
          className="p-6 sm:p-8 bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 cursor-pointer"
        >
          <Star className="w-12 h-12 text-orange-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Testimonials</h3>
          <p className="text-gray-400 mb-4 text-sm">Manage client testimonials and reviews</p>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('skills')}
          className="p-6 sm:p-8 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 cursor-pointer"
        >
          <Target className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Skills</h3>
          <p className="text-gray-400 mb-4 text-sm">Update your skills and expertise</p>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('approach')}
          className="p-6 sm:p-8 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer"
        >
          <Target className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Approach</h3>
          <p className="text-gray-400 mb-4 text-sm">Update your work methodology</p>
          <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
            Manage
          </Button>
        </Card>

        <Card 
          onClick={() => setActiveSection('messages')}
          className="p-6 sm:p-8 bg-gradient-to-br from-pink-900/20 to-rose-900/20 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 cursor-pointer"
        >
          <MessageSquare className="w-12 h-12 text-pink-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Contact Messages</h3>
          <p className="text-gray-400 mb-4 text-sm">View and manage contact form submissions</p>
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold">
            Manage
          </Button>
        </Card>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23]">
      {/* Header */}
      <header className="bg-[#0a0a1a]/80 backdrop-blur-lg border-b border-cyan-500/20 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activeSection !== 'overview' && (
              <Button
                onClick={() => setActiveSection('overview')}
                variant="outline"
                size="sm"
                className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              <span className="text-cyan-400">Admin</span> Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
