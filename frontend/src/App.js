import React from 'react';
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Testimonials from './components/Testimonials';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

// Import mock data
import { personalInfo, projects, workExperience, testimonials, skills, approach } from './data/mock';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero personalInfo={personalInfo} />
        <BentoGrid personalInfo={personalInfo} skills={skills} />
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
