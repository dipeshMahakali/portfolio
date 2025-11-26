import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Cpu, Brain, Zap, Sparkles, Box, Cloud, Server, Layers, Terminal, FileCode, GitBranch, Package, Settings, Workflow, Layout, Smartphone, Monitor } from 'lucide-react';
import { Card } from './ui/card';

const Skills = ({ skills }) => {
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

  // Get icon and color based on technology name
  const getIconAndColor = (skillName, iconName) => {
    const name = skillName?.toLowerCase() || '';
    
    // Technology-specific icon and color mappings
    const techMappings = {
      // Frontend
      'react': { icon: Code, gradient: 'from-cyan-500 to-blue-500' },
      'vue': { icon: Layers, gradient: 'from-green-500 to-emerald-500' },
      'angular': { icon: Box, gradient: 'from-red-500 to-pink-500' },
      'svelte': { icon: Zap, gradient: 'from-orange-500 to-red-500' },
      'nextjs': { icon: Layout, gradient: 'from-gray-800 to-gray-900' },
      'next.js': { icon: Layout, gradient: 'from-gray-800 to-gray-900' },
      'nuxt': { icon: Layers, gradient: 'from-green-600 to-teal-600' },
      'html': { icon: FileCode, gradient: 'from-orange-500 to-red-500' },
      'css': { icon: FileCode, gradient: 'from-blue-500 to-cyan-500' },
      'javascript': { icon: Code, gradient: 'from-yellow-400 to-yellow-600' },
      'typescript': { icon: Code, gradient: 'from-blue-600 to-blue-700' },
      'tailwind': { icon: Sparkles, gradient: 'from-cyan-400 to-blue-500' },
      'bootstrap': { icon: Layout, gradient: 'from-purple-600 to-purple-700' },
      'sass': { icon: FileCode, gradient: 'from-pink-500 to-pink-600' },
      'jquery': { icon: Code, gradient: 'from-blue-400 to-blue-600' },
      
      // Backend
      'python': { icon: Terminal, gradient: 'from-blue-500 to-yellow-500' },
      'node': { icon: Server, gradient: 'from-green-600 to-green-700' },
      'nodejs': { icon: Server, gradient: 'from-green-600 to-green-700' },
      'node.js': { icon: Server, gradient: 'from-green-600 to-green-700' },
      'express': { icon: Server, gradient: 'from-gray-700 to-gray-800' },
      'django': { icon: Server, gradient: 'from-green-700 to-green-800' },
      'flask': { icon: Server, gradient: 'from-gray-600 to-gray-700' },
      'fastapi': { icon: Zap, gradient: 'from-teal-500 to-green-500' },
      'php': { icon: Code, gradient: 'from-indigo-600 to-purple-600' },
      'laravel': { icon: Server, gradient: 'from-red-500 to-orange-500' },
      'ruby': { icon: Code, gradient: 'from-red-600 to-red-700' },
      'rails': { icon: Server, gradient: 'from-red-600 to-red-700' },
      'java': { icon: Code, gradient: 'from-red-600 to-orange-600' },
      'spring': { icon: Server, gradient: 'from-green-600 to-green-700' },
      'go': { icon: Code, gradient: 'from-cyan-500 to-blue-600' },
      'golang': { icon: Code, gradient: 'from-cyan-500 to-blue-600' },
      'rust': { icon: Code, gradient: 'from-orange-600 to-red-600' },
      'c++': { icon: Code, gradient: 'from-blue-600 to-purple-600' },
      'c#': { icon: Code, gradient: 'from-purple-600 to-purple-700' },
      '.net': { icon: Server, gradient: 'from-purple-600 to-blue-700' },
      
      // Databases
      'mongodb': { icon: Database, gradient: 'from-green-600 to-green-700' },
      'mysql': { icon: Database, gradient: 'from-blue-600 to-cyan-600' },
      'postgresql': { icon: Database, gradient: 'from-blue-700 to-indigo-700' },
      'postgres': { icon: Database, gradient: 'from-blue-700 to-indigo-700' },
      'redis': { icon: Database, gradient: 'from-red-600 to-red-700' },
      'sqlite': { icon: Database, gradient: 'from-blue-400 to-blue-500' },
      'firebase': { icon: Database, gradient: 'from-orange-500 to-yellow-500' },
      'dynamodb': { icon: Database, gradient: 'from-blue-600 to-blue-800' },
      'cassandra': { icon: Database, gradient: 'from-blue-500 to-cyan-600' },
      'elasticsearch': { icon: Database, gradient: 'from-yellow-500 to-teal-500' },
      
      // Cloud & DevOps
      'aws': { icon: Cloud, gradient: 'from-orange-500 to-orange-600' },
      'azure': { icon: Cloud, gradient: 'from-blue-500 to-blue-600' },
      'gcp': { icon: Cloud, gradient: 'from-blue-500 to-green-500' },
      'google cloud': { icon: Cloud, gradient: 'from-blue-500 to-green-500' },
      'docker': { icon: Box, gradient: 'from-blue-500 to-blue-600' },
      'kubernetes': { icon: Settings, gradient: 'from-blue-600 to-purple-600' },
      'jenkins': { icon: Workflow, gradient: 'from-red-600 to-gray-700' },
      'github actions': { icon: GitBranch, gradient: 'from-gray-800 to-gray-900' },
      'terraform': { icon: Cloud, gradient: 'from-purple-600 to-purple-700' },
      'ansible': { icon: Settings, gradient: 'from-red-600 to-gray-800' },
      
      // AI/ML
      'tensorflow': { icon: Brain, gradient: 'from-orange-500 to-orange-600' },
      'pytorch': { icon: Brain, gradient: 'from-red-600 to-orange-600' },
      'scikit-learn': { icon: Brain, gradient: 'from-orange-500 to-blue-500' },
      'keras': { icon: Brain, gradient: 'from-red-500 to-red-600' },
      'pandas': { icon: Database, gradient: 'from-blue-600 to-purple-600' },
      'numpy': { icon: Cpu, gradient: 'from-blue-500 to-cyan-500' },
      'opencv': { icon: Monitor, gradient: 'from-green-600 to-blue-600' },
      'hugging face': { icon: Brain, gradient: 'from-yellow-500 to-orange-500' },
      'langchain': { icon: Brain, gradient: 'from-green-500 to-blue-500' },
      
      // Mobile
      'react native': { icon: Smartphone, gradient: 'from-cyan-500 to-blue-500' },
      'flutter': { icon: Smartphone, gradient: 'from-blue-400 to-cyan-500' },
      'swift': { icon: Code, gradient: 'from-orange-500 to-red-500' },
      'kotlin': { icon: Code, gradient: 'from-purple-600 to-purple-700' },
      'ionic': { icon: Smartphone, gradient: 'from-blue-500 to-blue-600' },
      
      // Tools
      'git': { icon: GitBranch, gradient: 'from-orange-600 to-red-600' },
      'github': { icon: GitBranch, gradient: 'from-gray-800 to-gray-900' },
      'gitlab': { icon: GitBranch, gradient: 'from-orange-600 to-red-600' },
      'vscode': { icon: Code, gradient: 'from-blue-500 to-blue-600' },
      'vim': { icon: Terminal, gradient: 'from-green-600 to-green-700' },
      'postman': { icon: Server, gradient: 'from-orange-500 to-orange-600' },
      'webpack': { icon: Package, gradient: 'from-blue-500 to-cyan-500' },
      'vite': { icon: Zap, gradient: 'from-purple-500 to-yellow-500' },
      'npm': { icon: Package, gradient: 'from-red-600 to-red-700' },
      'yarn': { icon: Package, gradient: 'from-blue-500 to-blue-600' },
    };
    
    // Try to find a match
    for (const [key, value] of Object.entries(techMappings)) {
      if (name.includes(key)) {
        return value;
      }
    }
    
    // If icon name is provided, try to use it
    if (iconName) {
      const icons = {
        'code': { icon: Code, gradient: 'from-cyan-500 to-blue-500' },
        'database': { icon: Database, gradient: 'from-purple-500 to-pink-500' },
        'globe': { icon: Globe, gradient: 'from-blue-500 to-green-500' },
        'cpu': { icon: Cpu, gradient: 'from-orange-500 to-red-500' },
        'brain': { icon: Brain, gradient: 'from-purple-500 to-pink-500' },
        'zap': { icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
        'sparkles': { icon: Sparkles, gradient: 'from-cyan-400 to-purple-500' },
        'server': { icon: Server, gradient: 'from-green-500 to-blue-500' },
        'cloud': { icon: Cloud, gradient: 'from-blue-400 to-cyan-500' },
      };
      const match = icons[iconName.toLowerCase()];
      if (match) return match;
    }
    
    // Default
    return { icon: Code, gradient: 'from-cyan-500 to-blue-500' };
  };

  // Group skills by category if available
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 sm:py-24 bg-gradient-to-b from-[#0f0f23] to-[#0a0a1a]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Skills</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {Object.keys(groupedSkills).length > 1 ? (
          // Render grouped by category
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6 text-center sm:text-left">
                  {category}
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
                >
                  {categorySkills.map((skill, index) => {
                    const { icon: IconComponent, gradient } = getIconAndColor(skill.name, skill.icon);
                    return (
                      <motion.div key={index} variants={itemVariants}>
                        <Card className="p-4 sm:p-6 h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold text-white">{skill.name}</h3>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          // Render without categories
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {skills.map((skill, index) => {
              const IconComponent = getIcon(skill.icon);
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-4 sm:p-6 h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white">{skill.name}</h3>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
