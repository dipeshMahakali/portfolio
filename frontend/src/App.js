import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import "./App.css";
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';
import api from './services/api';
import { CardShimmer, BentoCardShimmer, StatsCardShimmer, SkillCardShimmer, TestimonialCardShimmer, ShimmerBox } from './components/ui/shimmer-border';

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
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23]">
          <Header />
          <main className="container mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Hero Section Shimmer */}
            <div className="py-20 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <ShimmerBox className="w-16 h-16 rounded-2xl" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Portfolio
                </span>
              </h1>
              <p className="text-gray-400 text-xl mb-8">Loading amazing content...</p>
              <ShimmerBox className="w-32 h-12 rounded-full mx-auto" />
            </div>

            {/* Bento Grid Shimmer */}
            <div className="py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 lg:row-span-2">
                  <BentoCardShimmer />
                </div>
                <BentoCardShimmer />
                <BentoCardShimmer />
                <BentoCardShimmer />
                <BentoCardShimmer />
              </div>
            </div>

            {/* Stats Dashboard Shimmer */}
            <div className="py-16">
              <div className="text-center mb-12">
                <ShimmerBox className="w-48 h-8 rounded-lg mx-auto mb-4" />
                <ShimmerBox className="w-64 h-6 rounded-lg mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCardShimmer />
                <StatsCardShimmer />
                <StatsCardShimmer />
                <StatsCardShimmer />
              </div>
            </div>

            {/* Skills Shimmer */}
            <div className="py-16">
              <div className="text-center mb-12">
                <ShimmerBox className="w-32 h-8 rounded-lg mx-auto mb-4" />
                <ShimmerBox className="w-48 h-6 rounded-lg mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
                <SkillCardShimmer />
              </div>
            </div>

            {/* Certifications Shimmer */}
            <div className="py-16">
              <div className="text-center mb-12">
                <ShimmerBox className="w-40 h-8 rounded-lg mx-auto mb-4" />
                <ShimmerBox className="w-56 h-6 rounded-lg mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
              </div>
            </div>

            {/* Testimonials Shimmer */}
            <div className="py-16">
              <div className="text-center mb-12">
                <ShimmerBox className="w-36 h-8 rounded-lg mx-auto mb-4" />
                <ShimmerBox className="w-52 h-6 rounded-lg mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestimonialCardShimmer />
                <TestimonialCardShimmer />
                <TestimonialCardShimmer />
              </div>
            </div>
          </main>
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
