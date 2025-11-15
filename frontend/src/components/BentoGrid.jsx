import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Code2, Cpu, Brain } from 'lucide-react';
import { Card } from './ui/card';

const BentoGrid = ({ personalInfo, skills }) => {
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
    <section id="about" className="py-24 bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23]">
      <div className="container mx-auto px-6">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Large Card - Main Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
            <Card className="p-8 h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{personalInfo.name}</h3>
                    <p className="text-cyan-400">{personalInfo.title}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {personalInfo.description}
                </p>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Github className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Twitter className="w-5 h-5 text-cyan-400" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Skill Cards */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
              <Code2 className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Python Expert</h3>
              <p className="text-gray-400 text-sm">Advanced proficiency in Python development and automation</p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <Cpu className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">IoT Enthusiast</h3>
              <p className="text-gray-400 text-sm">Creating smart solutions with Internet of Things</p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-6 h-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <Brain className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI & Machine Learning</h3>
              <p className="text-gray-400 text-sm mb-4">Building intelligent systems with cutting-edge AI technologies</p>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.name} className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-xs">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
