import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Skills from './components/Skills';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Testimonials from './components/Testimonials';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import api from './services/api';

// Import mock data as fallback
import { personalInfo as mockPersonalInfo, projects as mockProjects, workExperience as mockWorkExperience, testimonials as mockTestimonials, skills as mockSkills, approach as mockApproach } from './data/mock';

function App() {
  const [personalInfo, setPersonalInfo] = useState(mockPersonalInfo);
  const [projects, setProjects] = useState(mockProjects);
  const [workExperience, setWorkExperience] = useState(mockWorkExperience);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [skills, setSkills] = useState(mockSkills);
  const [approach, setApproach] = useState(mockApproach);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data from API
        const [
          personalInfoRes,
          projectsRes,
          workExpRes,
          testimonialsRes,
          skillsRes,
          approachRes
        ] = await Promise.all([
          api.personalInfo.get(),
          api.projects.getAll(),
          api.workExperience.getAll(),
          api.testimonials.getAll(),
          api.skills.get(),
          api.approach.get()
        ]);

        // Update state with API data
        setPersonalInfo(personalInfoRes.data);
        
        // Map projects to match frontend structure
        setProjects(projectsRes.data.map(p => ({
          id: p._id || p.id,
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          github: p.github,
          featured: p.featured
        })));

        // Map work experience
        setWorkExperience(workExpRes.data.map(w => ({
          id: w._id || w.id,
          title: w.title,
          company: w.company,
          period: w.period,
          description: w.description,
          technologies: w.technologies
        })));

        // Map testimonials
        setTestimonials(testimonialsRes.data.map(t => ({
          id: t._id || t.id,
          name: t.name,
          position: t.position,
          company: t.company,
          content: t.content,
          rating: t.rating
        })));

        // Skills are already in correct format
        setSkills(skillsRes.data);

        // Map approach items
        setApproach(approachRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        // Keep using mock data as fallback
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Hero personalInfo={personalInfo} />
        <BentoGrid personalInfo={personalInfo} skills={skills} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <WorkExperience workExperience={workExperience} />
        <Testimonials testimonials={testimonials} />
        <Approach approach={approach} />
        <Contact personalInfo={personalInfo} />
      </main>
      <Footer personalInfo={personalInfo} />
      <Toaster />
    </div>
  );
}

export default App;
