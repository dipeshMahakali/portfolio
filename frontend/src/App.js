import React, { useState, useEffect, lazy, Suspense } from 'react';
import "./App.css";
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import api from './services/api';

// Import mock data as fallback
import { personalInfo as mockPersonalInfo, projects as mockProjects, workExperience as mockWorkExperience, testimonials as mockTestimonials, skills as mockSkills, approach as mockApproach } from './data/mock';

// Lazy load heavy components for better memory management
const Hero = lazy(() => import('./components/Hero'));
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const MetricsDashboard = lazy(() => import('./components/MetricsDashboard'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Projects = lazy(() => import('./components/Projects'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const GitHubStats = lazy(() => import('./components/GitHubStats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Approach = lazy(() => import('./components/Approach'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [personalInfo, setPersonalInfo] = useState(mockPersonalInfo);
  const [projects, setProjects] = useState(mockProjects);
  const [workExperience, setWorkExperience] = useState(mockWorkExperience);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [skills, setSkills] = useState(mockSkills);
  const [approach, setApproach] = useState(mockApproach);
  const [metrics, setMetrics] = useState(null);
  const [certifications, setCertifications] = useState(null);
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
          approachRes,
          metricsRes,
          certificationsRes
        ] = await Promise.all([
          api.personalInfo.get(),
          api.projects.getAll(),
          api.workExperience.getAll(),
          api.testimonials.getAll(),
          api.skills.get(),
          api.approach.get(),
          api.metrics.get(),
          api.certifications.get()
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
          featured: p.featured,
          demo: p.demo,
          metrics: p.metrics
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

        // Set metrics and certifications
        setMetrics(metricsRes.data.metrics);
        setCertifications(certificationsRes.data.certifications);

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
    <div className="App min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0a0a1a]">
      <Header />
      <main>
        <Suspense fallback={<div className="h-screen" />}>
          <Hero personalInfo={personalInfo} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <BentoGrid personalInfo={personalInfo} skills={skills} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <MetricsDashboard metricsData={metrics} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Skills skills={skills} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Certifications certificationsData={certifications} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Projects projects={projects} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <WorkExperience workExperience={workExperience} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <GitHubStats personalInfo={personalInfo} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Testimonials testimonials={testimonials} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Approach approach={approach} />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Contact personalInfo={personalInfo} />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-24" />}>
        <Footer personalInfo={personalInfo} />
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
