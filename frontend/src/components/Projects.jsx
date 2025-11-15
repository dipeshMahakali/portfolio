import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colors = [
    'from-cyan-900/30 to-blue-900/30 border-cyan-500/30',
    'from-purple-900/30 to-pink-900/30 border-purple-500/30',
    'from-green-900/30 to-emerald-900/30 border-green-500/30'
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <Card className={`p-8 h-full bg-gradient-to-br ${colors[index % 3]} hover:border-opacity-60 transition-all duration-300 group`}>
        <div style={{ transform: "translateZ(50px)" }} className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
              <Github className="w-7 h-7 text-cyan-400" />
            </div>
            {project.featured && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full border border-white/10">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              asChild
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-all duration-300 hover:scale-105"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#0f0f23] to-[#0a0a1a]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work showcasing Python, AI, and IoT innovations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
