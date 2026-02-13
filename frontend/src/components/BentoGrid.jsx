import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Code2, Cpu, Brain } from 'lucide-react';
import { Card } from './ui/card';
import SparkleEffect from './ui/HoverSparkles';

const BentoGrid = ({ personalInfo, skills }) => {
  const defaultPersonalInfo = {
    name: "John Doe",
    title: "Full Stack Developer & AI Engineer",
    description: "Passionate developer with expertise in building scalable web applications and implementing cutting-edge AI solutions. Specialized in React, Python, and machine learning technologies.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  };

  const defaultSkills = [
    { name: "React", level: 90 },
    { name: "Python", level: 85 },
    { name: "TensorFlow", level: 80 },
    { name: "AWS", level: 75 }
  ];

  const personalInfoData = personalInfo || defaultPersonalInfo;
  const skillsData = skills && skills.length > 0 ? skills : defaultSkills;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about my skills and background
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {/* Large Card - Main Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
            <Card className="p-8 h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 relative group overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(6,182,212,0.1)] hover:shadow-[0_12px_48px_rgba(6,182,212,0.25)] hover:scale-[1.02]">
              <SparkleEffect />
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                    {personalInfoData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{personalInfoData.name}</h3>
                    <p className="text-cyan-400">{personalInfoData.title}</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {personalInfoData.description}
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfoData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfoData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfoData.location}</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href={personalInfoData.github} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Github className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a href={personalInfoData.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a href={personalInfoData.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Twitter className="w-5 h-5 text-cyan-400" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

              {/* Skill Cards */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 relative group overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(168,85,247,0.1)] hover:shadow-[0_12px_48px_rgba(168,85,247,0.3)]">
                  <SparkleEffect />
                  <div className="relative z-10">
                    <Code2 className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Python Expert</h3>
                    <p className="text-gray-400 text-sm">Advanced proficiency in Python development and automation</p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-6 h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 hover:scale-105 relative group overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.3)]">
                  <SparkleEffect />
                  <div className="relative z-10">
                    <Cpu className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">IoT Enthusiast</h3>
                    <p className="text-gray-400 text-sm">Creating smart solutions with Internet of Things</p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="p-6 h-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 hover:border-green-500/60 transition-all duration-500 hover:scale-105 relative group overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(34,197,94,0.1)] hover:shadow-[0_12px_48px_rgba(34,197,94,0.3)]">
                  <SparkleEffect />
                  <div className="relative z-10">
                    <Brain className="w-12 h-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">AI Specialist</h3>
                    <p className="text-gray-400 text-sm">Machine learning and AI-driven applications</p>
                    <div className="flex flex-wrap gap-2">
                      {skillsData.slice(0, 4).map((skill) => (
                        <div key={skill.name} className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/30">
                          <span className="text-green-400 text-xs">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
