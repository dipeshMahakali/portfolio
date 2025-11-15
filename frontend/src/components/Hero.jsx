import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Sparkles, MoveRight } from 'lucide-react';
import { Button } from './ui/button';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 2000;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    // Cyan to white colors
    colors[i * 3] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = 1;
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function GridPlane() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime % 10) - 5;
    }
  });
  
  return (
    <gridHelper 
      ref={gridRef}
      args={[50, 50, '#00d4ff', '#0099ff']}
      position={[0, -5, 0]}
    />
  );
}

const Hero = ({ personalInfo }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0f0f23] to-[#0a0a1a]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
          <ParticleField />
          <GridPlane />
        </Canvas>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-mono tracking-wider">WELCOME TO MY PORTFOLIO</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              {personalInfo.title}
            </p>
            
            <p className="text-lg text-gray-400 max-w-2xl">
              {personalInfo.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                View My Work
                <MoveRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-8 py-6 text-lg transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-cyan-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
