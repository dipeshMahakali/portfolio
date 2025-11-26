import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Cpu, Brain, Zap, Sparkles } from 'lucide-react';
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

  // Default icon if not specified
  const getIcon = (iconName) => {
    const icons = {
      'code': Code,
      'database': Database,
      'globe': Globe,
      'cpu': Cpu,
      'brain': Brain,
      'zap': Zap,
      'sparkles': Sparkles
    };
    return icons[iconName?.toLowerCase()] || Code;
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
