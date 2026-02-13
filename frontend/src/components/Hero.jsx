import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Sparkles, MoveRight, Terminal, Gamepad2, Code } from 'lucide-react';
import { Button } from './ui/button';
import * as THREE from 'three';
import usePerformanceLevel, { getAnimationConfig } from '../hooks/usePerformanceLevel';

// Modern Floating Particles with glow effect
function FloatingParticles({ count = 500 }) {
  const pointsRef = useRef();
  const particleCount = count;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

    const colorChoice = Math.random();
    if (colorChoice < 0.4) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.83; colors[i * 3 + 2] = 1;
    } else if (colorChoice < 0.7) {
      colors[i * 3] = 0.66; colors[i * 3 + 1] = 0.33; colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 0.13; colors[i * 3 + 1] = 0.87; colors[i * 3 + 2] = 0.34;
    }

    sizes[i] = Math.random() * 2 + 0.5;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Geometric Shapes Array
function GeometricShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const shapes = [
    { pos: [15, 8, -10], rotation: [0, 0, 0], type: 'box', size: 2, color: '#00d4ff' },
    { pos: [-15, -8, -8], rotation: [0, 0, 0], type: 'octahedron', size: 1.5, color: '#a855f7' },
    { pos: [10, -10, 5], rotation: [0, 0, 0], type: 'tetrahedron', size: 1.8, color: '#22c55e' },
    { pos: [-12, 10, 8], rotation: [0, 0, 0], type: 'torus', size: 1.2, color: '#06b6d4' },
    { pos: [18, 0, -5], rotation: [0, 0, 0], type: 'cone', size: 1.5, color: '#f59e0b' },
    { pos: [-18, 2, -15], rotation: [0, 0, 0], type: 'dodecahedron', size: 1.3, color: '#ec4899' },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos} rotation={[i * 0.3, i * 0.4, i * 0.2]}>
          {shape.type === 'box' && <boxGeometry args={[shape.size, shape.size, shape.size]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[shape.size]} />}
          {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[shape.size]} />}
          {shape.type === 'torus' && <torusGeometry args={[shape.size, 0.4, 16, 32]} />}
          {shape.type === 'cone' && <coneGeometry args={[shape.size, shape.size * 1.5, 8]} />}
          {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[shape.size]} />}
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated Wave Grid
function WaveGrid() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 0.5;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
      meshRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -15, -10]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

// 3D AI Microchips
function AIChips() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  const chips = [
    { pos: [12, 6, -8], scale: 1, color: '#00d4ff', delay: 0 },
    { pos: [-14, -5, -12], scale: 0.8, color: '#a855f7', delay: 1 },
    { pos: [8, -9, 5], scale: 1.2, color: '#06b6d4', delay: 2 },
    { pos: [-10, 8, 10], scale: 0.9, color: '#22c55e', delay: 1.5 },
  ];

  return (
    <group ref={groupRef}>
      {chips.map((chip, i) => (
        <group key={i} position={chip.pos} scale={chip.scale}>
          {/* Main chip body */}
          <mesh>
            <boxGeometry args={[2, 0.3, 2]} />
            <meshStandardMaterial
              color={chip.color}
              emissive={chip.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Circuit pattern on top */}
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[1.8, 0.02, 1.8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={chip.color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Corner pins */}
          {[-0.8, 0.8].map((x) =>
            [-0.8, 0.8].map((z, idx) => (
              <mesh key={`${x}-${z}`} position={[x, -0.2, z]}>
                <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
                <meshStandardMaterial color="#666666" metalness={1} roughness={0.3} />
              </mesh>
            ))
          )}

          {/* Pulsing glow ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
            <ringGeometry args={[1.2, 1.4, 32]} />
            <meshBasicMaterial color={chip.color} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Neural Network Nodes
function NeuralNodes() {
  const nodesGroupRef = useRef();
  const nodeCount = 20;

  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 25,
    ],
    scale: Math.random() * 0.3 + 0.2,
    color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#a855f7' : '#22c55e',
    speed: Math.random() * 0.5 + 0.5,
  }));

  useFrame((state) => {
    if (nodesGroupRef.current) {
      // Only animate the mesh children (not the lines)
      nodesGroupRef.current.children.forEach((child, i) => {
        if (child.type === 'Mesh' && nodes[i]) {
          const node = nodes[i];
          child.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * node.speed + i) * 0.5;
          child.scale.setScalar(node.scale + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05);
        }
      });
    }
  });

  return (
    <group>
      {/* Node meshes in a separate group */}
      <group ref={nodesGroupRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.position}>
            <sphereGeometry args={[node.scale, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Neural connections in a separate group */}
      <group>
        {nodes.slice(0, 15).map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length];
          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...nextNode.position),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`line-${i}`} geometry={geometry}>
              <lineBasicMaterial color="#00d4ff" transparent opacity={0.15} />
            </line>
          );
        })}
      </group>
    </group>
  );
}

// Floating Code Symbols
function FloatingSymbols() {
  const symbolsRef = useRef();

  useFrame((state) => {
    if (symbolsRef.current) {
      symbolsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const symbols = ['<', '>', '{', '}', '/', '*'];

  return (
    <group ref={symbolsRef}>
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const radius = 15;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 3,
              Math.sin(angle) * radius
            ]}
          >
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial
              color="#00d4ff"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

const Hero = ({ personalInfo }) => {
  const performanceLevel = usePerformanceLevel();
  const config = getAnimationConfig(performanceLevel);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0f0f23] to-[#0a0a1a]">
      {/* Modern Tech Graphics Background - Performance Adaptive */}
      {config.enableThreeJS ? (
        <div className="absolute inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 25], fov: 75 }}
            dpr={performanceLevel === 'high' ? [1, 2] : [1, 1.5]}
            gl={{ 
              antialias: performanceLevel === 'high',
              powerPreference: "high-performance",
              alpha: true
            }}
            performance={{ min: 0.5 }}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[20, 20, 20]} intensity={1.5} color="#00d4ff" />
            {performanceLevel === 'high' && (
              <>
                <pointLight position={[-20, -20, -20]} intensity={1} color="#a855f7" />
                <pointLight position={[0, 20, 10]} intensity={0.8} color="#22c55e" />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={0.5} color="#00d4ff" />
              </>
            )}
            <FloatingParticles count={config.particleCount * 10} />
            {performanceLevel === 'high' && (
              <>
                <GeometricShapes />
                <WaveGrid />
                <AIChips />
              </>
            )}
            <NeuralNodes />
          </Canvas>
        </div>
      ) : (
        // Professional CSS-only background for low-end devices
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-wavy" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl animate-wavy" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-2xl animate-wavy" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Mesh grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          </div>
          
          {/* Diagonal light streaks */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/5 to-transparent rotate-12" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/5 to-transparent -rotate-12" />
          
          {/* Subtle floating orbs */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-float" />
          <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-float-delayed" />
          <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-blue-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-float-delayed" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* Dynamic gradient overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Radial gradients */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-wavy" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl animate-wavy" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-2xl" />

        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Corner accent lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.02)_50%)] bg-[length:100%_4px] animate-scan" />
      </div>

      {/* Floating code snippets overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-cyan-400 font-mono text-xs animate-float">
          {'{ "ai": "neural_network" }'}
        </div>
        <div className="absolute top-40 right-20 text-purple-400 font-mono text-xs animate-float-delayed">
          {'<IoT connection="active" />'}
        </div>
        <div className="absolute bottom-32 left-1/4 text-green-400 font-mono text-xs animate-float">
          {'function predict(data) { ... }'}
        </div>
        <div className="absolute bottom-20 right-1/3 text-blue-400 font-mono text-xs animate-float-delayed">
          {'model.accuracy > 0.95'}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 max-w-7xl h-full flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 pt-16 sm:pt-0"
          >
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 text-cyan-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
              <Terminal className="w-5 h-5 animate-wavy" />
              <span className="text-sm font-mono tracking-wider">SYSTEM ONLINE</span>
              <Gamepad2 className="w-5 h-5 animate-wavy" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-block">
                <span className="text-white">Hello, I'm </span>
                <br className="sm:hidden" />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-2xl" />
                </span>
              </span>
            </motion.h1>

            {/* Subtitle with typing effect styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl">
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
                  {personalInfo.title}
                </span>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {personalInfo.description}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="relative border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Get In Touch
                </span>
              </Button>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {['Python', 'AI/ML', 'IoT', 'Automation'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          <div className="w-8 h-14 border-2 border-cyan-500/50 rounded-full flex justify-center p-2 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes scan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
            opacity: 0.7;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
