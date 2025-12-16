import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Cpu, Brain, Zap, Sparkles, Box, Cloud, Server, Layers, Terminal, FileCode, GitBranch, Package, Settings, Workflow, Radio, Layout, Smartphone, Monitor } from 'lucide-react';
import { Card } from './ui/card';
import SparkleEffect from './ui/HoverSparkles';

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
      'react': { icon: Code, gradient: 'from-cyan-500 to-blue-500', color: 'bg-cyan-500' },
      'vue': { icon: Layers, gradient: 'from-green-500 to-emerald-500', color: 'bg-green-500' },
      'angular': { icon: Box, gradient: 'from-red-500 to-pink-500', color: 'bg-red-500' },
      'svelte': { icon: Zap, gradient: 'from-orange-500 to-red-500', color: 'bg-orange-500' },
      'nextjs': { icon: Layout, gradient: 'from-gray-800 to-gray-900', color: 'bg-gray-800' },
      'next.js': { icon: Layout, gradient: 'from-gray-800 to-gray-900', color: 'bg-gray-800' },
      'nuxt': { icon: Layers, gradient: 'from-green-600 to-teal-600', color: 'bg-green-600' },
      'html': { icon: FileCode, gradient: 'from-orange-500 to-red-500', color: 'bg-orange-500' },
      'css': { icon: FileCode, gradient: 'from-blue-500 to-cyan-500', color: 'bg-blue-500' },
      'javascript': { icon: Code, gradient: 'from-yellow-400 to-yellow-600', color: 'bg-yellow-400' },
      'typescript': { icon: Code, gradient: 'from-blue-600 to-blue-700', color: 'bg-blue-600' },
      'tailwind': { icon: Sparkles, gradient: 'from-cyan-400 to-blue-500', color: 'bg-cyan-400' },
      'bootstrap': { icon: Layout, gradient: 'from-purple-600 to-purple-700', color: 'bg-purple-600' },
      'sass': { icon: FileCode, gradient: 'from-pink-500 to-pink-600', color: 'bg-pink-500' },
      'jquery': { icon: Code, gradient: 'from-blue-400 to-blue-600', color: 'bg-blue-400' },
      'automation': { icon: Workflow, gradient: 'from-amber-400 to-orange-600', color: 'bg-amber-400' },
      'iot': { icon: Radio, gradient: "from-cyan-400 to-blue-600", color: 'bg-cyan-400' },
      'robotics': { icon: Cpu, gradient: "from-purple-400 to-indigo-600", color: 'bg-purple-400' },

      // Backend
      'python': { icon: Terminal, gradient: 'from-blue-500 to-yellow-500', color: 'bg-blue-500' },
      'node': { icon: Server, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'nodejs': { icon: Server, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'node.js': { icon: Server, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'express': { icon: Server, gradient: 'from-gray-700 to-gray-800', color: 'bg-gray-700' },
      'django': { icon: Server, gradient: 'from-green-700 to-green-800', color: 'bg-green-700' },
      'flask': { icon: Server, gradient: 'from-gray-600 to-gray-700', color: 'bg-gray-600' },
      'fastapi': { icon: Zap, gradient: 'from-teal-500 to-green-500', color: 'bg-teal-500' },
      'php': { icon: Code, gradient: 'from-indigo-600 to-purple-600', color: 'bg-indigo-600' },
      'laravel': { icon: Server, gradient: 'from-red-500 to-orange-500', color: 'bg-red-500' },
      'ruby': { icon: Code, gradient: 'from-red-600 to-red-700', color: 'bg-red-600' },
      'rails': { icon: Server, gradient: 'from-red-600 to-red-700', color: 'bg-red-600' },
      'java': { icon: Code, gradient: 'from-red-600 to-orange-600', color: 'bg-red-600' },
      'spring': { icon: Server, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'go': { icon: Code, gradient: 'from-cyan-500 to-blue-600', color: 'bg-cyan-500' },
      'golang': { icon: Code, gradient: 'from-cyan-500 to-blue-600', color: 'bg-cyan-500' },
      'rust': { icon: Code, gradient: 'from-orange-600 to-red-600', color: 'bg-orange-600' },
      'c++': { icon: Code, gradient: 'from-blue-600 to-purple-600', color: 'bg-blue-600' },
      'c#': { icon: Code, gradient: 'from-purple-600 to-purple-700', color: 'bg-purple-600' },
      '.net': { icon: Server, gradient: 'from-purple-600 to-blue-700', color: 'bg-purple-600' },

      // Databases
      'mongodb': { icon: Database, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'mysql': { icon: Database, gradient: 'from-blue-600 to-cyan-600', color: 'bg-blue-600' },
      'postgresql': { icon: Database, gradient: 'from-blue-700 to-indigo-700', color: 'bg-blue-700' },
      'postgres': { icon: Database, gradient: 'from-blue-700 to-indigo-700', color: 'bg-blue-700' },
      'redis': { icon: Database, gradient: 'from-red-600 to-red-700', color: 'bg-red-600' },
      'sqlite': { icon: Database, gradient: 'from-blue-400 to-blue-500', color: 'bg-blue-400' },
      'firebase': { icon: Database, gradient: 'from-orange-500 to-yellow-500', color: 'bg-orange-500' },
      'dynamodb': { icon: Database, gradient: 'from-blue-600 to-blue-800', color: 'bg-blue-600' },
      'cassandra': { icon: Database, gradient: 'from-blue-500 to-cyan-600', color: 'bg-blue-500' },
      'elasticsearch': { icon: Database, gradient: 'from-yellow-500 to-teal-500', color: 'bg-yellow-500' },

      // Cloud & DevOps
      'aws': { icon: Cloud, gradient: 'from-orange-500 to-orange-600', color: 'bg-orange-500' },
      'azure': { icon: Cloud, gradient: 'from-blue-500 to-blue-600', color: 'bg-blue-500' },
      'gcp': { icon: Cloud, gradient: 'from-blue-500 to-green-500', color: 'bg-blue-500' },
      'google cloud': { icon: Cloud, gradient: 'from-blue-500 to-green-500', color: 'bg-blue-500' },
      'docker': { icon: Box, gradient: 'from-blue-500 to-blue-600', color: 'bg-blue-500' },
      'kubernetes': { icon: Settings, gradient: 'from-blue-600 to-purple-600', color: 'bg-blue-600' },
      'jenkins': { icon: Workflow, gradient: 'from-red-600 to-gray-700', color: 'bg-red-600' },
      'github actions': { icon: GitBranch, gradient: 'from-gray-800 to-gray-900', color: 'bg-gray-800' },
      'terraform': { icon: Cloud, gradient: 'from-purple-600 to-purple-700', color: 'bg-purple-600' },
      'ansible': { icon: Settings, gradient: 'from-red-600 to-gray-800', color: 'bg-red-600' },

      // AI/ML
      'tensorflow': { icon: Brain, gradient: 'from-orange-500 to-orange-600', color: 'bg-orange-500' },
      'pytorch': { icon: Brain, gradient: 'from-red-600 to-orange-600', color: 'bg-red-600' },
      'scikit-learn': { icon: Brain, gradient: 'from-orange-500 to-blue-500', color: 'bg-orange-500' },
      'keras': { icon: Brain, gradient: 'from-red-500 to-red-600', color: 'bg-red-500' },
      'pandas': { icon: Database, gradient: 'from-blue-600 to-purple-600', color: 'bg-blue-600' },
      'numpy': { icon: Cpu, gradient: 'from-blue-500 to-cyan-500', color: 'bg-blue-500' },
      'opencv': { icon: Monitor, gradient: 'from-green-600 to-blue-600', color: 'bg-green-600' },
      'hugging face': { icon: Brain, gradient: 'from-yellow-500 to-orange-500', color: 'bg-yellow-500' },
      'langchain': { icon: Brain, gradient: 'from-green-500 to-blue-500', color: 'bg-green-500' },

      // Mobile
      'react native': { icon: Smartphone, gradient: 'from-cyan-500 to-blue-500', color: 'bg-cyan-500' },
      'flutter': { icon: Smartphone, gradient: 'from-blue-400 to-cyan-500', color: 'bg-blue-400' },
      'swift': { icon: Code, gradient: 'from-orange-500 to-red-500', color: 'bg-orange-500' },
      'kotlin': { icon: Code, gradient: 'from-purple-600 to-purple-700', color: 'bg-purple-600' },
      'ionic': { icon: Smartphone, gradient: 'from-blue-500 to-blue-600', color: 'bg-blue-500' },

      // Tools
      'git': { icon: GitBranch, gradient: 'from-orange-600 to-red-600', color: 'bg-orange-600' },
      'github': { icon: GitBranch, gradient: 'from-gray-800 to-gray-900', color: 'bg-gray-800' },
      'gitlab': { icon: GitBranch, gradient: 'from-orange-600 to-red-600', color: 'bg-orange-600' },
      'vscode': { icon: Code, gradient: 'from-blue-500 to-blue-600', color: 'bg-blue-500' },
      'vim': { icon: Terminal, gradient: 'from-green-600 to-green-700', color: 'bg-green-600' },
      'postman': { icon: Server, gradient: 'from-orange-500 to-orange-600', color: 'bg-orange-500' },
      'webpack': { icon: Package, gradient: 'from-blue-500 to-cyan-500', color: 'bg-blue-500' },
      'vite': { icon: Zap, gradient: 'from-purple-500 to-yellow-500', color: 'bg-purple-500' },
      'npm': { icon: Package, gradient: 'from-red-600 to-red-700', color: 'bg-red-600' },
      'yarn': { icon: Package, gradient: 'from-blue-500 to-blue-600', color: 'bg-blue-500' },
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
        'code': { icon: Code, gradient: 'from-cyan-500 to-blue-500', color: 'bg-cyan-500' },
        'database': { icon: Database, gradient: 'from-purple-500 to-pink-500', color: 'bg-purple-500' },
        'globe': { icon: Globe, gradient: 'from-blue-500 to-green-500', color: 'bg-blue-500' },
        'cpu': { icon: Cpu, gradient: 'from-orange-500 to-red-500', color: 'bg-orange-500' },
        'brain': { icon: Brain, gradient: 'from-purple-500 to-pink-500', color: 'bg-purple-500' },
        'zap': { icon: Zap, gradient: 'from-yellow-500 to-orange-500', color: 'bg-yellow-500' },
        'sparkles': { icon: Sparkles, gradient: 'from-cyan-400 to-purple-500', color: 'bg-cyan-400' },
        'server': { icon: Server, gradient: 'from-green-500 to-blue-500', color: 'bg-green-500' },
        'cloud': { icon: Cloud, gradient: 'from-blue-400 to-cyan-500', color: 'bg-blue-400' },
      };
      const match = icons[iconName.toLowerCase()];
      if (match) return match;
    }

    // Default
    return { icon: Code, gradient: 'from-cyan-500 to-blue-500', color: 'bg-cyan-500' };
  };

  const SkillCard = ({ skill }) => {
    const { icon: IconComponent, gradient } = getIconAndColor(skill.name, skill.icon);
    const level = skill.level || 0;

    return (
      <Card className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] group overflow-hidden relative">
        <SparkleEffect />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative p-5 flex flex-col items-center h-full justify-between gap-4 z-10">
          <div className="flex flex-col items-center text-center space-y-3 w-full">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <IconComponent className="w-7 h-7 text-white" />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">{skill.name}</h3>
          </div>

          {/* Skill Level Bar */}
          <div className="w-full space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-medium">Proficiency</span>
              <span>{level}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${gradient}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </Card>
    );
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

  const hasCategories = Object.keys(groupedSkills).length > 1;

  return (
    <section id="skills" className="py-20 sm:py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-blue-950/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-cyan-950/30 border border-cyan-800/30">
            <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm text-cyan-400 font-medium tracking-wide">EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Proficiency</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of the technologies and tools I've mastered to build scalable, high-performance applications.
          </p>
        </motion.div>

        {hasCategories ? (
          <div className="space-y-16 max-w-6xl mx-auto">
            {Object.entries(groupedSkills).map(([category, categorySkills], idx) => (
              <div key={category}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl sm:text-2xl font-bold text-slate-100 mb-8 border-l-4 border-cyan-500 pl-4 flex items-center"
                >
                  {category}
                  <span className="ml-4 h-px bg-slate-800 flex-grow max-w-[200px]" />
                </motion.h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {categorySkills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto"
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
