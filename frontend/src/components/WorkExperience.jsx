import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { Card } from './ui/card';

const WorkExperience = ({ workExperience }) => {
  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-[#0a0a1a] to-[#0f0f23]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work <span className="text-cyan-400">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and training
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {workExperience.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{work.title}</h3>
                        <p className="text-cyan-400 text-lg">{work.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{work.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {work.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {work.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
